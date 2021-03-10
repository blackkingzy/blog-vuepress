<template>
    <div id="base-list-layout">
        <div class="ui-posts" itemscope itemtype="http://schema.org/Blog">
            <article
                v-for="page in pages"
                :key="page.key"
                class="ui-post"
                itemprop="blogPost"
                itemscope
                itemtype="https://schema.org/BlogPosting"
            >
                <meta itemprop="mainEntityOfPage" :content="page.path" />

                <header class="ui-post-title" itemprop="name headline">
                    <NavLink :link="page.path" target="_blank">{{
                        page.title
                    }}</NavLink>
                </header>

                <client-only v-if="page.excerpt">
                    <!-- eslint-disable vue/no-v-html -->
                    <p
                        class="ui-post-summary"
                        itemprop="description"
                        v-html="page.excerpt"
                    />
                    <!-- eslint-enable vue/no-v-html -->
                </client-only>
                <p v-else class="ui-post-summary" itemprop="description">
                    {{ page.frontmatter.summary || page.summary }}
                </p>

                <footer>
                    <div
                        v-if="page.frontmatter.author"
                        class="ui-post-meta ui-post-author"
                        itemprop="publisher author"
                        itemtype="http://schema.org/Person"
                        itemscope
                    >
                        <NavigationIcon />
                        <span itemprop="name">{{
                            page.frontmatter.author
                        }}</span>
                        <span
                            v-if="page.frontmatter.location"
                            itemprop="address"
                        >
                            &nbsp; in {{ page.frontmatter.location }}
                        </span>
                    </div>

                    <div
                        v-if="page.frontmatter.date"
                        class="ui-post-meta ui-post-date"
                    >
                        <ClockIcon />
                        <time
                            pubdate
                            itemprop="datePublished"
                            :datetime="page.frontmatter.date"
                        >
                            {{ resolvePostDate(page.frontmatter.date) }}
                        </time>
                    </div>

                    <div
                        v-if="page.frontmatter.tags"
                        class="ui-post-meta ui-post-tag"
                        itemprop="keywords"
                    >
                        <TagIcon />
                        <router-link
                            v-for="tag in resolvePostTags(
                                page.frontmatter.tags
                            )"
                            :key="tag"
                            :to="'/tag/' + tag"
                        >
                            {{ tag }}
                        </router-link>
                    </div>
                </footer>
            </article>
        </div>

        <component
            :is="paginationComponent"
            v-if="$pagination.length > 1 && paginationComponent"
        ></component>
    </div>
</template>

<script>
/* global THEME_BLOG_PAGINATION_COMPONENT */

import Vue from "vue";
import dayjs from "dayjs";
import dayjsPluginUTC from "dayjs/plugin/utc.js";
import { NavigationIcon, ClockIcon, TagIcon } from "vue-feather-icons";
import Pagination from "../components/Pagination.vue";

dayjs.extend(dayjsPluginUTC);

export default {
    components: { NavigationIcon, ClockIcon, TagIcon },

    data() {
        return {
            paginationComponent: null,
        };
    },

    computed: {
        pages() {
            return this.$pagination.pages;
        },
    },

    created() {
        this.paginationComponent = this.getPaginationComponent();
    },

    methods: {
        getPaginationComponent() {
            return Pagination;
        },

        resolvePostDate(date) {
            return dayjs
                .utc(date)
                .format(this.$themeConfig.dateFormat || "ddd MMM DD YYYY");
        },

        resolvePostTags(tags) {
            if (!tags || Array.isArray(tags)) return tags;
            return [tags];
        },
    },
};
</script>

<style lang="stylus">
footer {
    color: $metaColor;
}

.common-layout {
    .content-wrapper {
        padding-bottom: 80px;
    }
}
.ui-posts{
    min-height: calc(100vh - 80px - 62px - 160px - 80px);
}

.ui-post {
    padding-bottom: 25px;
    margin-bottom: 25px;
    border-bottom: 1px solid $borderColor;

    &:last-child {
        border-bottom: 0px;
        margin-bottom: 0px;
    }
}

.ui-post-title {
    font-size: 1.4rem;
    color: #2e3135;

    a {
        font-weight: 600;
        cursor: pointer;
        color: $darkTextColor;
        transition: all 0.2s;
        text-decoration: none;
        font-family: PT Serif, Serif;

        &:hover {
            text-decoration: underline;
        }
    }
}

.ui-post-summary {
    font-size: 14px;
    font-weight: 200;
}

.ui-post-meta {
    display: inline-flex;
    align-items: center;
    font-size: 12px;
    line-height: 12px;

    &:not(:last-child) {
        margin-bottom: 3px;
        margin-right: 20px;
    }

    svg {
        margin-right: 5px;
        width: 14px;
        height: 14px;
    }

    @media (max-width: $MQMobile) {
        display: flex;

        &:not(:last-child) {
            margin-bottom: 10px;
        }
    }
}

.ui-post-author {
    font-weight: 400;
}

.ui-post-date {
    font-weight: 200;
}

.ui-post-tag {
    font-weight: 200;

    a {
        color: inherit;
        font-weight: 200;
        text-decoration: none;
        margin-right: 5px;

        &:hover {
            color: $accentColor;
        }
    }
}
</style>

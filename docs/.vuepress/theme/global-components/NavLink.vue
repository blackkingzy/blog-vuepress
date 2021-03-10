<template>
    <router-link
        v-if="!isExternal(normalizedlink)"
        class="nav-link"
        :to="normalizedlink"
        exact
        :target="target"
    >
        <slot />
    </router-link>
    <a
        v-else
        :href="normalizedlink"
        class="nav-link external"
        :target="
            isMailto(normalizedlink) || isTel(normalizedlink) ? null : '_blank'
        "
        :rel="
            isMailto(normalizedlink) || isTel(normalizedlink)
                ? null
                : 'noopener noreferrer'
        "
    >
        <slot />
    </a>
</template>

<script>
import { isExternal, isMailto, isTel, ensureExt } from "../components/util.js";

export default {
    props: {
        link: {
            required: true,
        },
        target: String,
    },

    computed: {
        normalizedlink() {
            return ensureExt(this.link);
        },
    },

    methods: {
        isExternal,
        isMailto,
        isTel,
    },
};
</script>

<style lang="stylus">
.nav-link {
    color: $darkTextColor;
}

.nav-link {
    &:hover, &.router-link-active {
        color: $accentColor;
    }
}
</style>

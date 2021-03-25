<template>
    <Vssue v-if="$service.comment.service === 'vssue'" v-bind="vssueProps" />
</template>

<script>
import identity from "lodash/identity";
import pickBy from "lodash/pickBy";

export default {
    props: {
        // vssue's props
        title: {
            type: [String, Function],
            required: false,
        },
        issueId: {
            type: [String, Number],
            required: false,
        },
        options: {
            type: Object,
            required: false,
        },
    },

    computed: {
        propsWithoutEmptyProperties() {
            return pickBy(this.$props, identity);
        },

        commentProps() {
            return Object.assign(
                {},
                this.propsWithoutEmptyProperties,
                this.$frontmatter.comment
            );
        },

        vssueProps() {
            return Object.assign(
                {
                    title: this.$page.title,
                    options: {
                        proxy: (url) => `https://www.blackyue.com/${url}`, //
                    },
                },
                this.commentProps
            );
        },
    },
};
</script>

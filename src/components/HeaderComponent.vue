<template>
    <header>
        <h1>{{ title }}</h1>
    </header>
</template>

<script>
export default {
    data() {
        return {
            title: import.meta.env.VITE_APP_TITLE
        };
    }
};
</script>
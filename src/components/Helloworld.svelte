<script>
  export let name;
  export let layout;

  $: console.log(layout);
</script>

<style>
  .hello {
    width: 100%;
    height: 100%;
  }

  h1 {
    color: green;
  }
</style>

<h1 class="hello">Hello {name}</h1>

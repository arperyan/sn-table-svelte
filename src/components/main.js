import HelloWorld from './Helloworld.svelte';
// import "../../dist/svelte-component.css"

let app;

export function render(element, props) {
  app = new HelloWorld({
    target: element,
    props: {
      name: 'nah',
      layout: props.layout
    }
  });
}

export function destroySvelte() {
  app.$destroy()

}

import Component from "./core/Component.js";
import ItemAppender from "./components/ItemAppender.js";
import Items from "./components/Items.js";

export default class App extends Component {
    setup() {
        this.$state = {
            isFilter: 0,
            items: [
                {
                    seq: 1,
                    contents: 'item1',
                    active: false,
                },
                {
                    seq: 2,
                    contents: 'item2',
                    active: true,
                }
            ]
        };
    }
    template() {
        return `
          <header data-component="item-appender"></header>
          <main data-component="items"></main>
          <footer data-component="item-filter"></footer>
        `;
    }
    mounted() {
        const { filteredItems } = this;
        const $ItemAppender = this.$target.querySelector('[data-component="item-appender"]');
        const $Items = this.$target.querySelector('[data-component="items"]');
        new ItemAppender($ItemAppender, {
            addItem: this.addItem.bind(this)
        });
        new Items($Items, {
            filteredItems,
            deleteItem: contents => this.deleteItem(contents),
            toggleItem: contents => this.toggleItem(contents),
        });
    }
    get filteredItems() {
        const { isFilter, items } = this.$state;
        return items.filter(({ active }) => (isFilter === 1 && active) ||
            (isFilter === 2 && !active) ||
            isFilter === 0);
    }
    addItem(contents) {
        const { items } = this.$state;
        const seq = Math.max(0, ...items.map(v => v.seq)) + 1;
        const active = false;
        this.setState({
            items: [
                ...items,
                { seq, contents, active }
            ]
        });
    }
    deleteItem(seq) {
        const { items } = this.$state;
        items.splice(items.findIndex(v => v.seq === seq), 1);
        this.setState({ items });
    }
}

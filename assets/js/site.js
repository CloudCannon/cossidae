import Alpine from 'alpinejs';

window.Alpine = Alpine;

Alpine.store('conditionals', {
    conditions: {},

    register(k, values) {
        this.conditions[k] = {
            available: values,
            selected: 'all'
        }

        let selected = localStorage.getItem(`conditional_${k}`) ?? "all";
        let selected_url = new URLSearchParams(window?.location?.search?.toLocaleLowerCase?.() || '?').get(k.toLocaleLowerCase());
        let selected_index = -1;
        if (selected_url) {
            if (selected_url === 'all') {
                selected = 'all';
            } else {
                selected_index = selected_url ? values.map(v => v.toLocaleLowerCase()).indexOf(selected_url) : -1;
            }
        }

        this.select(k, selected_index >= 0 ? values[selected_index] : selected);
    },
    select(k, v) {
        this.conditions[k].selected = v;
        localStorage.setItem(`conditional_${k}`, v);
        if (v !== 'all' && !this.conditions[k].available.includes(v)) {
            console.warn(`Selected the conditional ${k}:${v}, but ${v} is not one of the possible values (${this.conditions[k].available.join(', ')}).`)
        }
    },
    default(k, v) {
        if (!localStorage.getItem(`conditional_${k}`)) {
            this.select(k, v);
        }
    },
    selected(k) {
        return this.conditions[k]?.selected ?? null;
    },
    all(k) {
        return this.conditions[k]?.available ?? [];
    },
    keys() {
        return Object.keys(this.conditions);
    }
});

Alpine.start();

let handleEmpty = (items) => {
    if ( items === false ) {
        return false;
    }

    if ( items === null ) {
        return null;
    }

    if ( Array.isArray(items) && !items.length ) {
        return [];
    }

    if ( !Array.isArray(items) && !Object.keys(items).length ) {
        return {};
    }

    return true;
};

const Items = {
    pluck(items, key = 'id') {
        let plucked = [];
        for (let i = 0; i < items.length; i++) {
            plucked.push(items[i][key]);
        }

        return plucked;
    },

    find(items, ids) {
        let not_empty = handleEmpty(items);
        if ( not_empty !== true ) {
            return not_empty;
        }

        let single = false;
        if ( !Array.isArray(ids) ) {
            if ( typeof ids === 'string' ) {
                ids = parseInt(ids);
            }

            ids = [ids];
            single = true;
        }

        let new_items = Array.isArray(items) ? [] : {};
        let count = Array.isArray(items) ? items.length : Object.keys(items).length;
        for ( let i = 0; i < count; i++ ) {
            let index = Array.isArray(items) ? i : Object.keys(items)[i];
            if ( ids.includes(items[index].id) ) {
                new_items[index] = items[index];
            }
        }

        if ( single ) {
            if ( new_items.length ) {
                return new_items[0];
            }

            return false;
        }

        return new_items;
    },

    findByKey(items, key, value = true) {
        let not_empty = handleEmpty(items);
        if ( not_empty !== true ) {
            return not_empty;
        }

        let new_items = Array.isArray(items) ? [] : {};
        let count = Array.isArray(items) ? items.length : Object.keys(items).length;
        for ( let i = 0; i < count; i++ ) {
            let index = Array.isArray(items) ? i : Object.keys(items)[i];

            if ( items[index][key] == value ) {
                new_items[index] = items[index];
            }
        }

        return new_items;
    },

    add(items, item, return_type = 'array', at_first_position = false) {
        let not_empty = handleEmpty(items);
        if ( not_empty !== true ) {
            items = return_type == 'array' ? [] : {};
        }

        if ( Array.isArray(items) ) {
            if ( at_first_position ) {
                items.unshift(items);
            }
            else {
                items.push(item);
            }
        }
        else {
            items[item.id] = item;
        }

        return items;
    },

    replace(items, item) {
        let not_empty = handleEmpty(items);
        if ( not_empty !== true ) {
            return not_empty;
        }

        let new_items = Array.isArray(items) ? [] : {};
        let count = Array.isArray(items) ? items.length : Object.keys(items).length;
        for ( let i = 0; i < count; i++ ) {
            let index = Array.isArray(items) ? i : Object.keys(items)[i];

            if ( items[index].id == item.id ) {
                new_items[index] = item;
            }
            else {
                new_items[index] = items[index];
            }
        }

        return new_items;
    },

    delete(items, id) {
        let not_empty = handleEmpty(items);
        if ( not_empty !== true ) {
            return not_empty;
        }

        let new_items = Array.isArray(items) ? [] : {};
        let count = Array.isArray(items) ? items.length : Object.keys(items).length;
        for ( let i = 0; i < count; i++ ) {
            let index = Array.isArray(items) ? i : Object.keys(items)[i];

            if ( items[index].id != id ) {
                new_items[index] = items[index];
            }
        }

        return new_items;
    },

    setKeys(items, ids, keys, values) {
        let not_empty = handleEmpty(items);
        if ( not_empty !== true ) {
            return not_empty;
        }

        if ( !Array.isArray(ids) ) {
            if ( typeof ids === 'string' ) {
                ids = parseInt(ids);
            }

            ids = [ids];
        }

        if ( !Array.isArray(keys) ) {
            keys = [keys];
        }

        if ( !Array.isArray(values) ) {
            values = [values];
        }

        let count = Array.isArray(items) ? items.length : Object.keys(items).length;
        for ( let i = 0; i < count; i++ ) {
            let index = Array.isArray(items) ? i : Object.keys(items)[i];

            if ( ids.includes(items[index].id) ) {
                for ( let j = 0; j < keys.length; j++ ) {
                    items[i][keys[j]] = values[j];
                }
            }
        }

        return items;
    },

    toggleKeys(items, ids, keys) {
        let not_empty = handleEmpty(items);
        if ( not_empty !== true ) {
            return not_empty;
        }

        if ( !Array.isArray(ids) ) {
            if ( typeof ids === 'string' ) {
                ids = parseInt(ids);
            }

            ids = [ids];
        }

        if ( !Array.isArray(keys) ) {
            keys = [keys];
        }

        let count = Array.isArray(items) ? items.length : Object.keys(items).length;
        for ( let i = 0; i < count; i++ ) {
            let index = Array.isArray(items) ? i : Object.keys(items)[i];

            if ( ids.includes(items[index].id) ) {
                for ( let j = 0; j < keys.length; j++ ) {
                    items[index][keys[j]] = !items[index][keys[j]];
                }
            }
        }

        return items;
    },
};

const Item = {
    setKeys(item, keys, values) {
        let not_empty = handleEmpty(item);
        if ( not_empty !== true ) {
            return not_empty;
        }

        if ( !Array.isArray(keys) ) {
            keys = [keys];
        }

        if ( !Array.isArray(values) ) {
            values = [values];
        }

        for ( let i = 0; i < keys.length; i++ ) {
            item[keys[i]] = values[i];
        }

        return item;
    },
};

export { Items, Item };

new Vue({
    el: '#app',
    data: {
        total: 0,
        items: [
            { title: 'Grumpy cat', price: 9.99 },
            { title: 'Very grumpy cat', price: 4.99 },
            { title: 'Extremely grumpy cat', price: 7.99 }
        ],
        cart: [],
        search: 'grumpy cat',
        lastSearch: 'grumpy cat',
        loading: false
    },
    methods: {
        onSubmit: function() {
            this.items = [];
            this.loading = true;
            this.$http
            .get('/search/'.concat(this.search))
            .then(function(res){
                console.log(res);
                this.items = res.data;
                this.loading = false;
                this.lastSearch = this.search;
            });
        },
        addItem: function(index) {
            var item = this.items[index];
            this.total += item.price;
            
            var found = false;
            var foundIndex = this.cart.findIndex((cartItem) => item.title === cartItem.title);
            if (foundIndex === -1) //not in cart already
            {
                this.cart.push({
                    title: item.title,
                    price: item.price,
                    qty: 1
                });
            }
            else
                this.cart[foundIndex].qty++;
                
        },
        inc: function(item) {
            item.qty++;
            this.total += item.price;
        },
        dec: function(item) {
            item.qty--;
            this.total -= item.price;
            if (item.qty <= 0){
                var index = this.cart.findIndex((cartItem) => item.title === cartItem.title);
                if (index > -1)
                    this.cart.splice(index, 1);
            }
        }
    },
    filters: {
        currency: function(price) {
            return '$'.concat(price.toFixed(2));
        }
    },
    /*mounted: function() {
        this.onSubmit();
    }*/
});

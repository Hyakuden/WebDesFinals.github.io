document.addEventListener("DOMContentLoaded", function() {
    const cartItemsList = document.getElementById("cart-items");
    const totalDisplay = document.getElementById("total");
    const changeDisplay = document.getElementById("change");
    const amountInput = document.getElementById("amount");
    const calculateChangeBtn = document.getElementById("calculate-change");

    // Function to calculate the total price of items in the cart
    function calculateTotal() {
        let total = 0;
        const cartItems = cartItemsList.querySelectorAll("li");
        cartItems.forEach(function(item) {
            total += parseFloat(item.dataset.price);
        });
        totalDisplay.textContent = total.toFixed(2);
    }

    // Function to update the change display
    function updateChange() {
        const total = parseFloat(totalDisplay.textContent);
        const amountPaid = parseFloat(amountInput.value);
        const change = amountPaid - total;
        changeDisplay.textContent = change.toFixed(2);
    }

    // Event listener for calculate change button
    calculateChangeBtn.addEventListener("click", function() {
        updateChange();
    });

    // Event listener for input amount field
    amountInput.addEventListener("input", function() {
        updateChange();
    });

    // Function to remove item from cart
    function removeFromCart(event) {
        const item = event.target.parentElement;
        cartItemsList.removeChild(item);
        calculateTotal();
        updateChange();
    }

    // Add item to cart and update change
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            const itemName = button.dataset.name;
            const itemPrice = parseFloat(button.dataset.price);
            const item = document.createElement("li");
            item.textContent = `${itemName} - $${itemPrice.toFixed(2)}`;
            item.dataset.price = itemPrice;

            const removeButton = document.createElement("button");
            removeButton.textContent = "Remove";
            removeButton.classList.add("remove-from-cart");
            removeButton.addEventListener("click", removeFromCart);

            item.appendChild(removeButton);
            cartItemsList.appendChild(item);

            calculateTotal();
            updateChange();
        });
    });
});

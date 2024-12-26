
        const cartItems = document.getElementById("cart-items");
        const totalPriceElement = document.getElementById("total-price");
        const addItemButton = document.getElementById("add-item");
        const selectAllButton = document.getElementById("select-all");
        const selectedCount = document.getElementById("selected-count");

        // 更新总价和选中数量
        function updateTotalPrice() {
            let total = 0;
            let count = 0;

            document.querySelectorAll(".cart-item").forEach(item => {
                const checkbox = item.querySelector(".select-checkbox");
                if (checkbox.checked) {
                    const quantity = parseInt(item.querySelector(".quantity-input").value);
                    const price = parseFloat(item.querySelector(".price-input").value);
                    total += quantity * price;
                    count++;
                }
            });

            totalPriceElement.innerText = `总价: ¥${total}`;
            selectedCount.innerText = `当前选择订单数量: ${count}`;
            createHeartEffect();
        }

        // 添加爱心动画
        function createHeartEffect() {
            const heart = document.createElement("div");
            heart.classList.add("heart");
            heart.innerText = "❤️";
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 2000);
        }

        // 添加商品
        addItemButton.addEventListener("click", () => {
            const newItem = document.createElement("div");
            newItem.classList.add("cart-item");
            newItem.innerHTML = `
                <input type="checkbox" class="select-checkbox">
                <input type="text" class="name-input" value="新商品">
                <div>数量: <input type="number" class="quantity-input" value="1" min="1"></div>
                <div>价格: ¥<input type="number" class="price-input" value="0" min="0"></div>
                <div><button class="delete-btn">删除</button></div>
            `;
            attachEventListeners(newItem);
            cartItems.appendChild(newItem);
            updateTotalPrice();
        });

        // 全选功能
        selectAllButton.addEventListener("click", () => {
            const checkboxes = document.querySelectorAll(".select-checkbox");
            checkboxes.forEach(checkbox => checkbox.checked = true);
            updateTotalPrice();
        });

        // 绑定事件
        function attachEventListeners(item) {
            item.querySelector(".delete-btn").addEventListener("click", () => {
                item.remove();
                updateTotalPrice();
            });
            item.querySelector(".quantity-input").addEventListener("input", updateTotalPrice);
            item.querySelector(".price-input").addEventListener("input", updateTotalPrice);
            item.querySelector(".name-input").addEventListener("input", updateTotalPrice);
            item.querySelector(".select-checkbox").addEventListener("change", updateTotalPrice);
        }

        // 初始绑定事件
        document.querySelectorAll(".cart-item").forEach(attachEventListeners);
        updateTotalPrice();
    
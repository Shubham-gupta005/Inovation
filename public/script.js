document.addEventListener('DOMContentLoaded', function () {
    loadItems();

    window.reportLost = function () {
        const lostItem = document.getElementById('lostItem').value;
        const lostDescription = document.getElementById('lostDescription').value;
        const lostImageInput = document.getElementById('lostImage');

        if (lostItem.trim() !== '' && lostDescription.trim() !== '') {
            const lostImage = lostImageInput.files[0];
            const reader = new FileReader();

            reader.onload = function () {
                saveItem({
                    type: 'lost',
                    item: lostItem,
                    description: lostDescription,
                    image: reader.result,
                });
                loadItems();
                clearForm('lostForm');
            };

            if (lostImage) {
                reader.readAsDataURL(lostImage);
            } else {
                saveItem({
                    type: 'lost',
                    item: lostItem,
                    description: lostDescription,
                });
                loadItems();
                clearForm('lostForm');
            }
        } else {
            alert('Please fill in all fields');
        }
    };

    window.postFound = function () {
        const foundItem = document.getElementById('foundItem').value;
        const foundDescription = document.getElementById('foundDescription').value;
        const foundImageInput = document.getElementById('foundImage');

        if (foundItem.trim() !== '' && foundDescription.trim() !== '') {
            const foundImage = foundImageInput.files[0];
            const reader = new FileReader();

            reader.onload = function () {
                saveItem({
                    type: 'found',
                    item: foundItem,
                    description: foundDescription,
                    image: reader.result,
                });
                loadItems();
                clearForm('foundForm');
            };

            if (foundImage) {
                reader.readAsDataURL(foundImage);
            } else {
                saveItem({
                    type: 'found',
                    item: foundItem,
                    description: foundDescription,
                });
                loadItems();
                clearForm('foundForm');
            }
        } else {
            alert('Please fill in all fields');
        }
    };


    // Function to search items
    window.searchItems = function () {
        const searchInput = document.getElementById('searchInput').value.toLowerCase();
        const items = JSON.parse(localStorage.getItem('lostFoundItems')) || [];

        const filteredItems = items.filter(item =>
            item.item.toLowerCase().includes(searchInput) ||
            item.description.toLowerCase().includes(searchInput)
        );

        displayItems(filteredItems);
    };

    // Function to save an item to local storage
    function saveItem(item) {
        const items = JSON.parse(localStorage.getItem('lostFoundItems')) || [];
        items.push(item);
        localStorage.setItem('lostFoundItems', JSON.stringify(items));
    }

    // Function to load items from local storage
    function loadItems() {
        const items = JSON.parse(localStorage.getItem('lostFoundItems')) || [];
        displayItems(items);
    }

    // Function to display items on the page
    // Inside the "displayItems" function
    function displayItems(items) {
        const lostFoundList = document.getElementById('lostFoundList');
        lostFoundList.innerHTML = '';
        // Inside the function where you append items to the lostFoundList
        items.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'item';
            itemDiv.innerHTML = `
                <strong>${item.type === 'lost' ? 'Lost' : 'Found'}:</strong> ${item.item}<br>
                <em>${item.description}</em><br>
                ${item.image ? `<img src="${item.image}" alt="Item Image" style="max-width: 100%;">` : ''}
    `;
            lostFoundList.appendChild(itemDiv);
        });



    }


    // Function to clear form fields
    function clearForm(formId) {
        const form = document.getElementById(formId);
        form.reset();
    }
});

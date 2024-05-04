// alert('Seni was here. xD')

// Function for grouping the list elements based on the file path
function groupModels() {
    let list = document.querySelector("#setting_sd_model_checkpoint > label > div > ul");
    let listItems = list.querySelectorAll("li")
    let groups = {};

    // Iterate over the list elements and group them according to the path
    listItems.forEach(function(li) {
        let path = li.textContent.substring(0, li.textContent.lastIndexOf('\\') + 1);
        if (!groups[path]) {
            groups[path] = [];
        }
        groups[path].push(li);
    });

    // Add headings to the grouped elements
    Object.keys(groups).forEach(function(path) {
        let group = groups[path];
        if (group.length > 0) {
            let groupTitle = path.replace('\\', '');
            groupTitle = groupTitle.replace('✓', '');
            groupTitle = groupTitle.trim();

            /* Create new li group header*/
            var neuesLiElement = document.createElement("li");
            neuesLiElement.textContent = groupTitle;
            neuesLiElement.classList.add('SeniModelGroupHeader');
            list.appendChild(neuesLiElement);

            for (let i = 0; i < group.length; i++) {
                let element = group[i];
                if (element.classList.contains("SeniModelGroupHeader"))
                    continue;

                let elementName = element.innerText;
                if (elementName.includes('✓'))
                    element.classList.add('SeniModelSelected');
                element.classList.add('SeniModelGroupMember');
                elementName = elementName.replace('.safetensors', '');
                elementName = elementName.replace('\n', '');
                elementName = elementName.replace('✓', '');
                elementName = elementName.trim();
                elementName = elementName.replace(groupTitle + '\\', '');
                element.innerText = elementName;
                neuesLiElement.appendChild(element);
            }
        }
    });
}

// Hook into ui method to get state of loading
onUiLoaded(function() {
    document.querySelector('#setting_sd_model_checkpoint > label > div > div.wrap-inner.svelte-1xsj8nn > div > input').addEventListener("focus", myFocusFunction);
});


// Gets executed every time the checkpoint selection is focused
function myFocusFunction() {
    groupModels();
}
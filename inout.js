const dataKeys = [
    "title",
    "act1", "act1hook1", "act1hook2", "act1hook3",
    "act2", "act2hook1", "act2hook2", "act2hook3",
    "act3", "act3hook1", "act3hook2", "act3hook3",
    "character1name", "character1trait1", "character1trait2", "character1trait3",
    "character2name", "character2trait1", "character2trait2", "character2trait3",
    "character3name", "character3trait1", "character3trait2", "character3trait3",
    "character4name", "character4trait1", "character4trait2", "character4trait3",
    "character5name", "character5trait1", "character5trait2", "character5trait3",
    "character6name", "character6trait1", "character6trait2", "character6trait3",
    "character7name", "character7trait1", "character7trait2", "character7trait3",
    "character8name", "character8trait1", "character8trait2", "character8trait3",
    "character9name", "character9trait1", "character9trait2", "character9trait3",
    "setting1name", "setting1trait1", "setting1trait2", "setting1trait3",
    "setting2name", "setting2trait1", "setting2trait2", "setting2trait3",
    "setting3name", "setting3trait1", "setting3trait2", "setting3trait3",
    "setting4name", "setting4trait1", "setting4trait2", "setting4trait3",
    "setting5name", "setting5trait1", "setting5trait2", "setting5trait3",
    "setting6name", "setting6trait1", "setting6trait2", "setting6trait3",
    "setting7name", "setting7trait1", "setting7trait2", "setting7trait3",
    "setting8name", "setting8trait1", "setting8trait2", "setting8trait3",
    "setting9name", "setting9trait1", "setting9trait2", "setting9trait3",
];

function clearForm() {
    for (let inputElement of document.querySelectorAll("input")) {
        if (inputElement.type === "checkbox")
            inputElement.selected = false;
        else if (inputElement.type === "file")
            inputElement.value = null;
        else
            inputElement.value = "";
    }
    
    for (let selectElement of document.querySelectorAll("select"))
        selectElement.value = selectElement.querySelector("option[selected]") ?? "";
    
    for (let textAreaElement of document.querySelectorAll("textarea"))
        textAreaElement.value = "";
    }

function exportForm() {
    const data = getFormData();
    const docOut = getDocOut(data);
    const blob = new Blob([docOut], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "ruleofthree.md");
}

async function importMD(fileInput) {
    const fileContents = await readFile(fileInput);
    const parsedData = parseMDFile(fileContents);
    updateInputs(parsedData);
}

function getDocOut(data) {
    return `# ${data.title}

---

## Plot

### **${data.act1}**

- ${data.act1hook1}
- ${data.act1hook2}
- ${data.act1hook3}

### **${data.act2}**

- ${data.act2hook1}
- ${data.act2hook2}
- ${data.act2hook3}

### **${data.act3}**

- ${data.act3hook1}
- ${data.act3hook2}
- ${data.act3hook3}

---

## Characters

### **${data.character1name}**

- ${data.character1trait1}
- ${data.character1trait2}
- ${data.character1trait3}

### **${data.character2name}**

- ${data.character2trait1}
- ${data.character2trait2}
- ${data.character2trait3}

### **${data.character3name}**

- ${data.character3trait1}
- ${data.character3trait2}
- ${data.character3trait3}

### **${data.character4name}**

- ${data.character4trait1}
- ${data.character4trait2}
- ${data.character4trait3}

### **${data.character5name}**

- ${data.character5trait1}
- ${data.character5trait2}
- ${data.character5trait3}

### **${data.character6name}**

- ${data.character6trait1}
- ${data.character6trait2}
- ${data.character6trait3}

### **${data.character7name}**

- ${data.character7trait1}
- ${data.character7trait2}
- ${data.character7trait3}

### **${data.character8name}**

- ${data.character8trait1}
- ${data.character8trait2}
- ${data.character8trait3}

### **${data.character9name}**

- ${data.character9trait1}
- ${data.character9trait2}
- ${data.character9trait3}

---

## Settings

### **${data.setting1name}**

- ${data.setting1trait1}
- ${data.setting1trait2}
- ${data.setting1trait3}

### **${data.setting2name}**

- ${data.setting2trait1}
- ${data.setting2trait2}
- ${data.setting2trait3}

### **${data.setting3name}**

- ${data.setting3trait1}
- ${data.setting3trait2}
- ${data.setting3trait3}

### **${data.setting4name}**

- ${data.setting4trait1}
- ${data.setting4trait2}
- ${data.setting4trait3}

### **${data.setting5name}**

- ${data.setting5trait1}
- ${data.setting5trait2}
- ${data.setting5trait3}

### **${data.setting6name}**

- ${data.setting6trait1}
- ${data.setting6trait2}
- ${data.setting6trait3}

### **${data.setting7name}**

- ${data.setting7trait1}
- ${data.setting7trait2}
- ${data.setting7trait3}

### **${data.setting8name}**

- ${data.setting8trait1}
- ${data.setting8trait2}
- ${data.setting8trait3}

### **${data.setting9name}**

- ${data.setting9trait1}
- ${data.setting9trait2}
- ${data.setting9trait3}
`;
        
}

function getFormData() {
    const data = {};
    for (let key of dataKeys)
        data[key] = document.getElementById(key).value;
    
    return data;
}

function parseMDFile(event) {
    const rex = new RegExp(
        "^# (.*?)\\s+---\\s+" + 
        "## Plot\\s+" + 
        "### \\*\\*(.*?)\\*\\*\\s+- (.*?)\\n- (.*?)\\n- (.*?)\\n\\s+" + 
        "### \\*\\*(.*?)\\*\\*\\s+- (.*?)\\n- (.*?)\\n- (.*?)\\n\\s+" + 
        "### \\*\\*(.*?)\\*\\*\\s+- (.*?)\\n- (.*?)\\n- (.*?)\\n\\s+" + 
        "---\\s+" +
        "## Characters\\s+" + 
        "### \\*\\*(.*?)\\*\\*\\s+- (.*?)\\n- (.*?)\\n- (.*?)\\n\\s+" + 
        "### \\*\\*(.*?)\\*\\*\\s+- (.*?)\\n- (.*?)\\n- (.*?)\\n\\s+" + 
        "### \\*\\*(.*?)\\*\\*\\s+- (.*?)\\n- (.*?)\\n- (.*?)\\n\\s+" + 
        "### \\*\\*(.*?)\\*\\*\\s+- (.*?)\\n- (.*?)\\n- (.*?)\\n\\s+" + 
        "### \\*\\*(.*?)\\*\\*\\s+- (.*?)\\n- (.*?)\\n- (.*?)\\n\\s+" + 
        "### \\*\\*(.*?)\\*\\*\\s+- (.*?)\\n- (.*?)\\n- (.*?)\\n\\s+" + 
        "### \\*\\*(.*?)\\*\\*\\s+- (.*?)\\n- (.*?)\\n- (.*?)\\n\\s+" + 
        "### \\*\\*(.*?)\\*\\*\\s+- (.*?)\\n- (.*?)\\n- (.*?)\\n\\s+" + 
        "### \\*\\*(.*?)\\*\\*\\s+- (.*?)\\n- (.*?)\\n- (.*?)\\n\\s+" + 
        "---\\s+" +
        "## Settings\\s+" + 
        "### \\*\\*(.*?)\\*\\*\\s+- (.*?)\\n- (.*?)\\n- (.*?)\\n\\s+" + 
        "### \\*\\*(.*?)\\*\\*\\s+- (.*?)\\n- (.*?)\\n- (.*?)\\n\\s+" + 
        "### \\*\\*(.*?)\\*\\*\\s+- (.*?)\\n- (.*?)\\n- (.*?)\\n\\s+" + 
        "### \\*\\*(.*?)\\*\\*\\s+- (.*?)\\n- (.*?)\\n- (.*?)\\n\\s+" + 
        "### \\*\\*(.*?)\\*\\*\\s+- (.*?)\\n- (.*?)\\n- (.*?)\\n\\s+" + 
        "### \\*\\*(.*?)\\*\\*\\s+- (.*?)\\n- (.*?)\\n- (.*?)\\n\\s+" + 
        "### \\*\\*(.*?)\\*\\*\\s+- (.*?)\\n- (.*?)\\n- (.*?)\\n\\s+" + 
        "### \\*\\*(.*?)\\*\\*\\s+- (.*?)\\n- (.*?)\\n- (.*?)\\n\\s+" + 
        "### \\*\\*(.*?)\\*\\*\\s+- (.*?)\\n- (.*?)\\n- (.*?)\\s*" + 
        "$");
    const regexResult = rex.exec(event.target.result);
    const data = {};
    for (let i = 0; i < dataKeys.length; i++)
        data[dataKeys[i]] = regexResult[i + 1];
    
    return data;
}

function readFile(fileInput) {
    return new Promise((resolve) => {
        if (fileInput.files?.[0]) {
            const fileReader = new FileReader();
            fileReader.onload = resolve;
            fileReader.readAsText(fileInput.files[0]);
        }
    });
}

function updateInputs(data) {
    for (let key of dataKeys)
        document.getElementById(key).value = data[key] ?? "";
}
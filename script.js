{\rtf1\ansi\ansicpg949\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // \uc0\u52488 \u44592  \u45936 \u51060 \u53552  (\u50696 \u49884 , \u49892 \u51228 \u47196 \u45716  \u54028 \u51068 \u50640 \u49436  \u47196 \u46300 )\
let appData = \{\
    "domain": [\
        ["Software Engineering", "Beginner", "Requirements Engineering", "Requirements, Elicitation", "First step"],\
        ["Machine Learning", "Intermediate", "Linear Regression", "Regression, Supervised Learning", "Basic algorithm"],\
        ["AI", "Advanced", "Reinforcement Learning", "Policy, Reward", "Decision making"],\
        ["Android Development", "Expert", "MVVM Pattern", "Architecture, LiveData", "Clean code"],\
        ["Cryptography", "Intermediate", "Hash Algorithms", "SHA-256, MD5", "Data Integrity"]\
    ]\
\};\
\
// DOM \uc0\u50836 \u49548  \u52280 \u51312 \
const dataListContainer = document.getElementById('dataListContainer');\
const dataList = document.getElementById('dataList');\
const editFormContainer = document.getElementById('editFormContainer');\
const editForm = document.getElementById('editForm');\
const editIndexInput = document.getElementById('editIndex');\
const addDataBtn = document.getElementById('addDataBtn');\
const cancelEditBtn = document.getElementById('cancelEditBtn');\
const downloadJsonBtn = document.getElementById('downloadJsonBtn');\
\
// \uc0\u49688 \u51221  \u54268  \u54596 \u46300 \
const studyInput = document.getElementById('study');\
const levelInput = document.getElementById('level');\
const topicNameInput = document.getElementById('topic_name');\
const keywordInput = document.getElementById('keyword');\
const extraInput = document.getElementById('extra');\
\
let currentEditIndex = -1; // \uc0\u54788 \u51116  \u49688 \u51221  \u51473 \u51064  \u54637 \u47785 \u51032  \u51064 \u45937 \u49828 \
\
// \uc0\u45936 \u51060 \u53552 \u47484  \u47785 \u47197 \u51004 \u47196  \u54364 \u49884 \u54616 \u45716  \u54632 \u49688 \
function renderDataList() \{\
    dataList.innerHTML = ''; // \uc0\u44592 \u51316  \u47785 \u47197  \u52488 \u44592 \u54868 \
    if (!appData.domain || appData.domain.length === 0) \{\
        dataList.innerHTML = '<li>\uc0\u45936 \u51060 \u53552 \u44032  \u50630 \u49845 \u45768 \u45796 . \u49352  \u54637 \u47785 \u51012  \u52628 \u44032 \u54644 \u51452 \u49464 \u50836 .</li>';\
        return;\
    \}\
\
    appData.domain.forEach((item, index) => \{\
        const listItem = document.createElement('li');\
        listItem.dataset.index = index; // \uc0\u51064 \u45937 \u49828 \u47484  data \u49549 \u49457 \u50640  \u51200 \u51109 \
\
        // \uc0\u44033  \u54637 \u47785 \u51032  \u49464 \u48512  \u51221 \u48372  \u54364 \u49884 \
        listItem.innerHTML = `\
            <span><strong>Study:</strong> $\{item[0]\}</span>\
            <span><strong>Level:</strong> $\{item[1]\}</span>\
            <span><strong>Topic:</strong> $\{item[2]\}</span>\
            <span><strong>Keyword:</strong> $\{item[3]\}</span>\
            <span><strong>Extra:</strong> $\{item[4] || '-'\}</span>\
        `;\
        listItem.addEventListener('click', () => openEditPage(index));\
        dataList.appendChild(listItem);\
    \});\
\}\
\
// \uc0\u49345 \u49464  \u49688 \u51221  \u54168 \u51060 \u51648 \u47484  \u50668 \u45716  \u54632 \u49688 \
function openEditPage(index) \{\
    dataListContainer.classList.add('hidden');\
    addDataBtn.classList.add('hidden');\
    downloadJsonBtn.classList.add('hidden');\
    editFormContainer.classList.remove('hidden');\
\
    currentEditIndex = index;\
    editIndexInput.value = index;\
\
    if (index !== -1) \{ // \uc0\u44592 \u51316  \u54637 \u47785  \u49688 \u51221 \
        const item = appData.domain[index];\
        studyInput.value = item[0];\
        levelInput.value = item[1];\
        topicNameInput.value = item[2];\
        keywordInput.value = item[3];\
        extraInput.value = item[4];\
    \} else \{ // \uc0\u49352  \u54637 \u47785  \u52628 \u44032 \
        studyInput.value = '';\
        levelInput.value = '';\
        topicNameInput.value = '';\
        keywordInput.value = '';\
        extraInput.value = '';\
    \}\
\}\
\
// \uc0\u49688 \u51221  \u50756 \u47308  \u54980  \u45936 \u51060 \u53552  \u50976 \u54952 \u49457  \u44160 \u49324  \u48143  \u51200 \u51109 \
editForm.addEventListener('submit', (event) => \{\
    event.preventDefault(); // \uc0\u54268  \u51228 \u52636 \u51032  \u44592 \u48376  \u46041 \u51089  \u48169 \u51648 \
\
    // 1. \uc0\u50976 \u54952 \u49457  \u44160 \u49324 \
    if (!studyInput.value.trim() || !levelInput.value.trim() || !topicNameInput.value.trim() || !keywordInput.value.trim()) \{\
        alert('Study, Level, Topic Name, Keyword \uc0\u54596 \u46300 \u45716  \u54596 \u49688  \u51077 \u47141  \u54637 \u47785 \u51077 \u45768 \u45796 .');\
        return;\
    \}\
\
    // 2. \uc0\u45936 \u51060 \u53552  \u50629 \u45936 \u51060 \u53944  \u46608 \u45716  \u52628 \u44032 \
    const updatedItem = [\
        studyInput.value.trim(),\
        levelInput.value.trim(),\
        topicNameInput.value.trim(),\
        keywordInput.value.trim(),\
        extraInput.value.trim()\
    ];\
\
    if (currentEditIndex !== -1) \{\
        // \uc0\u44592 \u51316  \u54637 \u47785  \u49688 \u51221 \
        appData.domain[currentEditIndex] = updatedItem;\
        alert('\uc0\u54637 \u47785 \u51060  \u49457 \u44277 \u51201 \u51004 \u47196  \u49688 \u51221 \u46104 \u50632 \u49845 \u45768 \u45796 .');\
    \} else \{\
        // \uc0\u49352  \u54637 \u47785  \u52628 \u44032 \
        appData.domain.push(updatedItem);\
        alert('\uc0\u49352  \u54637 \u47785 \u51060  \u49457 \u44277 \u51201 \u51004 \u47196  \u52628 \u44032 \u46104 \u50632 \u49845 \u45768 \u45796 .');\
    \}\
\
    // 3. \uc0\u54168 \u51060 \u51648  \u45796 \u49884  \u54364 \u49884 \
    closeEditPage();\
\});\
\
// \uc0\u49688 \u51221  \u52712 \u49548  \u48143  \u47785 \u47197 \u51004 \u47196  \u46028 \u50500 \u44032 \u45716  \u54632 \u49688 \
cancelEditBtn.addEventListener('click', closeEditPage);\
\
function closeEditPage() \{\
    editFormContainer.classList.add('hidden');\
    dataListContainer.classList.remove('hidden');\
    addDataBtn.classList.remove('hidden');\
    downloadJsonBtn.classList.remove('hidden');\
    currentEditIndex = -1; // \uc0\u51064 \u45937 \u49828  \u52488 \u44592 \u54868 \
    renderDataList(); // \uc0\u47785 \u47197  \u45796 \u49884  \u47116 \u45908 \u47553 \
\}\
\
// \uc0\u49352  \u54637 \u47785  \u52628 \u44032  \u48260 \u53948  \u51060 \u48292 \u53944  \u47532 \u49828 \u45320 \
addDataBtn.addEventListener('click', () => openEditPage(-1)); // -1\uc0\u51008  \u49352  \u54637 \u47785  \u52628 \u44032 \u47484  \u51032 \u48120 \
\
// JSON \uc0\u54028 \u51068  \u45796 \u50868 \u47196 \u46300  \u44592 \u45733 \
downloadJsonBtn.addEventListener('click', () => \{\
    const jsonData = JSON.stringify(appData, null, 4); // \uc0\u50696 \u49240 \u44172  \u54252 \u47607 \u54021 \
    const blob = new Blob([jsonData], \{ type: 'application/json' \});\
    const url = URL.createObjectURL(blob);\
    \
    const a = document.createElement('a');\
    a.href = url;\
    a.download = 'modified_data.json'; // \uc0\u45796 \u50868 \u47196 \u46300 \u46112  \u54028 \u51068  \u51060 \u47492 \
    document.body.appendChild(a); // \uc0\u54028 \u51060 \u50612 \u54253 \u49828  \u46321  \u51068 \u48512  \u48652 \u46972 \u50864 \u51200  \u54840 \u54872 \u49457 \u51012  \u50948 \u54644  \u54596 \u50836 \
    a.click();\
    document.body.removeChild(a);\
    URL.revokeObjectURL(url); // \uc0\u51076 \u49884  URL \u54644 \u51228 \
    alert('JSON \uc0\u54028 \u51068 \u51060  \u45796 \u50868 \u47196 \u46300 \u46121 \u45768 \u45796 !');\
\});\
\
\
// \uc0\u54168 \u51060 \u51648  \u47196 \u46300  \u49884  \u45936 \u51060 \u53552  \u47785 \u47197  \u47116 \u45908 \u47553 \
document.addEventListener('DOMContentLoaded', () => \{\
    // \uc0\u49892 \u51228  JSON \u54028 \u51068  \u47196 \u46300  (\u50741 \u49496 )\
    // fetch('data.json')\
    //     .then(response => response.json())\
    //     .then(data => \{\
    //         appData = data;\
    //         renderDataList();\
    //     \})\
    //     .catch(error => \{\
    //         console.error('JSON \uc0\u54028 \u51068 \u51012  \u47196 \u46300 \u54616 \u45716  \u45936  \u49892 \u54056 \u54664 \u49845 \u45768 \u45796 :', error);\
    //         alert('\uc0\u45936 \u51060 \u53552  \u54028 \u51068 \u51012  \u47196 \u46300 \u54616 \u45716  \u45936  \u49892 \u54056 \u54664 \u49845 \u45768 \u45796 . \u44592 \u48376  \u45936 \u51060 \u53552 \u47196  \u49884 \u51089 \u54633 \u45768 \u45796 .');\
    //         renderDataList(); // \uc0\u54028 \u51068  \u47196 \u46300  \u49892 \u54056  \u49884  \u52488 \u44592  \u45936 \u51060 \u53552 \u47196  \u47116 \u45908 \u47553 \
    //     \});\
\
    // \uc0\u50948  fetch\u47484  \u51452 \u49437  \u52376 \u47532 \u54616 \u44256 , appData \u48320 \u49688 \u50640  \u51649 \u51217  \u45936 \u51060 \u53552 \u47484  \u45347 \u51004 \u47732  \u48148 \u47196  \u49324 \u50857  \u44032 \u45733 \u54633 \u45768 \u45796 .\
    renderDataList();\
\});}
// added lessons data----------------------------------
const lessonData = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then((Response) => Response.json())
        .then((lessons) => {
            displayData(lessons.data);
        });
};
lessonData();
const displayData = (lessonsData) => {
    //console.log(lessonsData);
    const parentDiv = document.getElementById("lessons-data");
    parentDiv.innerHTML = "";
    lessonsData.forEach((lesson) => {
        //console.log(lesson);
        const childDiv = document.createElement("div");
        childDiv.innerHTML = `<button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})"
                                    class="btn btn-soft btn-primary border-2 border-[#422ad5] lesson-button"
                                >
                                    <i class="fa-solid fa-book-open"></i>
                                   Lesson ${lesson.level_no}
                                </button>`;
        parentDiv.appendChild(childDiv);
    });
};
// added lessons data complete----------------------------------

const removeActiveClass = () => {
    const lessonButton = document.querySelectorAll(".lesson-button");
    lessonButton.forEach((btn) => {
        btn.classList.remove("active");
    });
};

// lesson data button and collecting word data from api----------------------------------
const loadLevelWord = (level_no) => {
    spinningOnOff(true);
    //console.log(data);
    const url = `https://openapi.programming-hero.com/api/level/${level_no}`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            removeActiveClass();
            const ClickBtn = document.getElementById(`lesson-btn-${level_no}`);
            ClickBtn.classList.add("active");
            displayWordData(data.data);
        });
};
const displayWordData = (wordsData) => {
    //console.log(wordsData.data);
    const parentSection = document.getElementById("wordData");
    parentSection.innerHTML = "";

    if (wordsData.length === 0) {
        const noDataDiv = document.createElement("div");
        noDataDiv.className = "my-8 col-span-3 text-center";
        noDataDiv.innerHTML = `
                   <img class="mx-auto" src="./assets/alert-error.png" alt="">
                    <p class="my-3 text-sm text-gray-400">
                        এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
                    </p>
                    <h1 class="mt-4 text-4xl font-bold">
                        নেক্সট Lesson এ যান
                    </h1>
        `;
        parentSection.appendChild(noDataDiv);
        spinningOnOff(false);
        return;
    }
    for (const wordData of wordsData) {
        const newDiv = document.createElement("div");
        newDiv.innerHTML = `<div class="bg-white rounded-lg shadow-md">
                    <div class="flex flex-col justify-center items-center">
                        <h1 class="text-lg font-bold mb-3 mt-6">${
                            wordData.word ? wordData.word : "শব্দটি পাওয়া জায়নি"
                        }</h1>
                        <p class="text-sm mb-3">Meaning /Pronounciation</p>
                        <p class="text-lg font-bold mb-3">${
                            wordData.meaning
                                ? wordData.meaning
                                : "শব্দার্থটি পাওয়া জায়নি"
                        } / ${
            wordData.pronunciation
                ? wordData.pronunciation
                : "উচ্চারণটি পাওয়া জায়নি"
        }</p>
                    </div>
                    <div class="flex justify-around items-center">
                        <div
                            class="my-6 p-2 shadow-sm bg-[#e9f4ff] rounded-xl hover:bg-slate-300"
                        >
                           <button onclick="loadWordDetaits(${
                               wordData.id
                           })"><i class="fa-solid fa-circle-info"></i></button>
                        </div>
                        <div
                            class="my-6 p-2 shadow-sm bg-[#e9f4ff] rounded-xl hover:bg-slate-300"
                        >
                            <button><i class="fa-solid fa-volume-high"></i></button>
                        </div>
                    </div>
                </div>`;
        parentSection.appendChild(newDiv);
    }
    spinningOnOff(false);
};
// complete lesson data button and collecting word data from api----------------------------------

//word details from all words and words details API----------------------------------------
//const synonymsArray = ["taslima", "imran", "rayhan"];
const createElement = (arr) => {
    const allSpanSynonyms = arr.map((el) => `<span class="btn">${el}</span>`);
    return allSpanSynonyms.join(" ");
};
// createElement(wordInnerData.synonyms);
//----------------------------------------------------------

const loadWordDetaits = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data);
};
const displayWordDetails = (wordInnerData) => {
    //console.log(wordInnerData);
    const wordDetails = document.getElementById("word-details");
    wordDetails.innerHTML = `
                            <h1 class="text-xl font-bold py-2">
                                ${
                                    wordInnerData.word
                                } (<i class="fa-solid fa-microphone"></i> 
                                :${wordInnerData.pronunciation})
                            </h1>
                            <p class="text-lg font-semibold py-2">Meaning</p>
                            <p class="text-sm font-light py-2">${
                                wordInnerData.meaning
                            }</p>
                            <h3 class="text-lg font-semibold py-2">Example</h3>
                            <p class="text-sm font-light py-2">
                                ${wordInnerData.sentence}
                            </p>
                            <h3 class="text-lg font-semibold py-2">
                                সমার্থক শব্দ গুলো
                            </h3>
                            <div
                                class="flex justify-start items-center gap-3 text-sm font-bold"
                            >
                                <div>
                                    ${createElement(wordInnerData.synonyms)}
                                </div>
                            </div>
                       
    `;

    document.getElementById("my_modal_5").showModal();
};

// spinning and loading on off function------------------------
const spinningOnOff = (status) => {
    if (status === true) {
        const loadingSection = document.getElementById("loadingSection");
        loadingSection.classList.remove("hidden");
        const wordData = document.getElementById("wordData");
        wordData.classList.add("hidden");
    } else {
        const loadingSection = document.getElementById("loadingSection");
        loadingSection.classList.add("hidden");
        const wordData = document.getElementById("wordData");
        wordData.classList.remove("hidden");
    }
};

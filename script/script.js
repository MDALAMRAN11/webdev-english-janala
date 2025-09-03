const lessonData = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then((Response) => Response.json())
        .then((lessons) => displayData(lessons.data));
};

const displayData = (lessonsData) => {
    const parentDiv = document.getElementById("lessons-data");
    parentDiv.innerHTML = "";
    lessonsData.forEach((lesson) => {
        console.log(lesson);
        const childDiv = document.createElement("div");
        childDiv.innerHTML = `<button
                                    class="btn btn-soft btn-primary border-2 border-[#422ad5]"
                                >
                                    <i class="fa-solid fa-book-open"></i>
                                   Lesson ${lesson.level_no}
                                </button>`;
        parentDiv.appendChild(childDiv);
    });
};
lessonData();

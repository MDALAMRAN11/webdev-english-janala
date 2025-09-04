const arr = ["imran", "rayhan", "chadni"];
const element = (data) => {
    //console.log(data);
    const newArray = data.map((el) => `<span class="btn">${el}</span`);
    console.log(newArray.join(" "));
};
element(arr);

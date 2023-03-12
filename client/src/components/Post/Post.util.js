export const displayRating = (rating) => {
    let filled = [];

    for(let i = 0; i < rating; i++) {
        filled[i] =  <span class='fa fa-star checked'></span>
    }

    let empty = [];

    for(let i = 0; i < filled.length - 5; i++) {
        empty[i] = <span class='fa fa-star checked'></span>
    }

    let display = [];

    for(let i = 0; i < filled.length; i++) {
        display.push(filled[i]);
    }

    for(let i = 0; i < empty.length; i++) {
        display.push(empty[i]);
    }

    return display;
}
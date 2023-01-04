'use strict'

let cells = document.querySelectorAll('#field td');
let parent = document.querySelector('#field')
let container = document.querySelector('.container')
let player = document.querySelector('#player')

function start(cells){
    let i=0;
    for(let cell of cells){
        cell.addEventListener('click',function step(ev){
           if(ev.target.textContent == 'O'){
            return
           }
            this.textContent = 'X'
            this.removeEventListener('click',step);
            i++
            if(isVictory(cells)){
                let p = document.createElement('p')
                p.textContent = 'Победил человек'
                container.appendChild(p)
                reload()
                return
            }
            setTimeout(function(){
                robot(cells)
                i++
                if(isVictory(cells)){
                    let p = document.createElement('p')
                    p.textContent = 'Победил робот'
                    container.appendChild(p)
                    reload()
                    return
                }
            },2000)
            if(i == 9){
                let p = document.createElement('p')
                p.textContent = 'Ничья'
                container.appendChild(p)
                reload()
            }  
        })
    }
}

//update page
function reload(){
    let btn = document.createElement('button');
    btn.textContent = 'Сыграть еще раз?'
    btn.classList.add('btnAgain')
    container.appendChild(btn)
    btn.addEventListener('click',function(){
        location.reload()
    })
}
start(cells)

function isVictory(cells){
    let combs = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];
    for(let comb of combs){
        if(
            cells[comb[0]].textContent == cells[comb[1]].textContent &&
            cells[comb[1]].textContent == cells[comb[2]].textContent &&
            cells[comb[2]].textContent !== ''){
                return true
            }
    }
    return false
}
function random(min,max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function robot(cells){
    for(let i=0; i<8; i++){
        let rob = random(0,8)
        if(!cells[rob].innerHTML){
            cells[rob].innerHTML = 'O'
            break
        }
    }
}
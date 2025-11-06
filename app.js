let table = document.querySelector('#table')
let map = []
let value_map = []
let height = 20
let width = 20
let colors = ['grey','black','white']
function randomNumber(max){
    return Math.floor(Math.random() * max) + 1
}

for(let a = 0; a < height; a++){
    let map_help_arr = []
    let tr = document.createElement('tr')
    let help_value_map = []
    for(let b = 0; b < width; b++){
        let td = document.createElement('td')
        td.dataset.x = b
        td.dataset.y = a
        tr.appendChild(td)
        td.style.backgroundColor = colors[0]
        map_help_arr.push(td)
        let random = randomNumber(5)
        if(random == 1){
            help_value_map.push(1)
        }else{
            help_value_map.push(0)
        }
        
    }
    table.append(tr)
    map.push(map_help_arr)
    value_map.push(help_value_map)
}

// for(let a = 0; a <map.length; a++){
//     for(let b = 0; b<map[a].length; b++){
//         map[a][b].style.backgroundColor = colors[value_map[a][b]]
//     }
// }
let game_over = false
table.addEventListener('click',(e)=>{
    if(game_over == false){
        let y = e.target.dataset.y*1
        let x = e.target.dataset.x*1
        console.log(y,x)
        let check_arr = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]]
        if(value_map[y][x] == 1){
            map[y][x].style.backgroundColor = colors[1]
            game_over = true
            alert('heheheha')
        }
        if(value_map[y][x] == 0){
            let bomb_counter = 0
            for(let a = 0; a<check_arr.length;a++){
                console.log(check_arr[a])
                if(value_map[y + check_arr[a][0]][x + check_arr[a][1]] == 1){
                    bomb_counter++
                }
            }
            if(bomb_counter == 0){
                for(let a = 0; a<check_arr.length;a++){
                    map[y + check_arr[a][0]][x + check_arr[a][1]].style.backgroundColor = colors[2]
                    value_map[y + check_arr[a][0]][x + check_arr[a][1]] = 2
                }
            }else{
                e.target.innerHTML = bomb_counter
            }
            
            map[y][x].style.backgroundColor = colors[2]
        }
    }
})
let table = document.querySelector('#table')
let map = []
let value_map = []
let height = 40
let width = 40
let font_colors = ['blue','green','yellow','orange','red','pink','purple','brown']
let colors = [['rgb(161, 161, 161)','rgb(100, 161, 161)'],'black','rgb(140, 140, 170)']
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
        td.dataset.type = 0
        tr.appendChild(td)
        td.style.backgroundColor = colors[0][0]
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
let game_over = false
table.addEventListener('click',(e)=>{
    if(game_over == false){
        let y = e.target.dataset.y*1
        let x = e.target.dataset.x*1
        checkCell(y,x)
    }
})
document.addEventListener('mousedown',(e)=>{
    if(e.button == 1){
        if(e.target.dataset.type == 0){
            map[e.target.dataset.y*1][e.target.dataset.x*1].style.backgroundColor = colors[0][1]
            e.target.dataset.type = 1
        }else{
            map[e.target.dataset.y*1][e.target.dataset.x*1].style.backgroundColor = colors[0][0]
            e.target.dataset.type = 0
        }
        
    }
})
function checkCell(y,x){
    let check_arr = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]]
    let check_arr_help = [[0,1,2,3,4,5,6,7],[4,6,7],[3,4,5,6,7],[3,5,6],[1,2,4,6,7],[0,1,3,5,6],[1,2,4],[0,1,2,3,4],[0,1,3]]
    let check_number
    if(y==0&x==0){
        check_number=1
    }else if(y==0&x<width-1){
        check_number=2
    }else if(y==0&x==width-1){
        check_number=3
    }else if(y<height-1&x==0){
        check_number=4
    }else if(y<height-1&x==width-1){
        check_number=5
    }else if(y==height-1&x==0){
        check_number=6
    }else if(y==height-1&x<width-1){
        check_number=7
    }else if(y==height-1&x==width-1){
        check_number=8
    }else{
        check_number=0
    }
        if(value_map[y][x] == 1){
            
            for(let a = 0; a<height;a++){
                for(let b = 0; b<width;b++){
                    if(value_map[a][b] == 1){
                        map[a][b].style.backgroundColor = colors[1]
                    }
                    
                }
            }
            game_over = true
        }
        if(value_map[y][x] == 0){
            let bomb_counter = 0
            for(let a = 0; a<check_arr_help[check_number].length;a++){
                
                if(value_map[y + check_arr[check_arr_help[check_number][a]][0]][x + check_arr[check_arr_help[check_number][a]][1]] == 1){
                    bomb_counter++
                }
            }
            if(bomb_counter == 0){
                for(let a = 0; a<check_arr_help[check_number].length;a++){
                    map[y][x].style.backgroundColor = colors[2]
                    value_map[y][x] = 2
                    for(let b =0;a<check_arr_help[check_number].length;a++){
                        checkCell(y+check_arr[check_arr_help[check_number][a]][0],x+check_arr[check_arr_help[check_number][a]][1])
                    }
                }
            }else{
                map[y][x].innerHTML = bomb_counter
                map[y][x].style.color = font_colors[bomb_counter-1]
            }
            map[y][x].style.backgroundColor = colors[2]
        }
}

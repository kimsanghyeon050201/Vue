import { ref } from "vue"

export default {

    data() {
        return {
            listPage: false,
            emptyPage: true,
            inputValue: ref(''),
            arr: [],
            checked: false,
            inputStyle : [],
        }
    },

    methods: {
        reload() {
            console.log('reload')

            const inputStyle = []

            fetch('http://localhost:3000/api/list', {
                method: "GET"
            }).then((data) => data.json()).then((res) => {
                const result = res.result
                const len = Object.keys(result).length

                if (len === 0) {
                    //리스트가 없으면 empty화면을 띄움
                    this.emptyPage = true
                    this.listPage = false
                } else {
                    //리스트가 있으면 list목록을 띄움
                    this.emptyPage = false
                    this.listPage = true

                    result.map((data) => {
                        if(data.state == 1){
                            data.state = true
                        }else{
                            data.state = false
                        }
                    })
                    
                    result.forEach(data => {
                        
                        if(data.state){
                            inputStyle.push({
                                textDecoration : 'line-through',
                                opacity : 0.4
                            })
                        }else{
                            inputStyle.push({
                                textDecoration : 'none',
                                opacity : 1
                            })
                        }
                    });

                    this.inputStyle = inputStyle

                    // 스위치 on상태 일때 판단
                    if (localStorage.getItem('onoff') == 'true') {
                        this.on(result)
                    } else {
                        this.off(result)
                    }
                }

                this.inputValue = ref('')
            })
        },
        on(arr) {
            this.checked = true

            const stateTure = arr.filter(data => data.state == 1)
            const stateFalse = arr.filter(data => data.state == 0)
            const concatArr = stateFalse.concat(stateTure)

            this.arr = concatArr
        },
        off(arr) {
            this.checked = false

            this.arr = arr
        },
        addItem() {
            fetch('http://localhost:3000/api/list/add', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "content": this.inputValue
                })
            }).then((res) => {
                return res.json()
            }).then(() => {
                //페이지 새로고침을 하지 않고 바로 화면에 반영하기
                this.reload()
            }).catch((err) => {
                console.error(`err : ${err}`)
            })
        },
        stateEdit(id, state){
            console.log(id, state)

            const index = this.arr.findIndex((item) => item.id == id)
            
            this.inputStyle[index].textDecoration = state ? 'line-through' : 'none'
            this.inputStyle[index].opacity = state ? 0.4 : 1
        },
        getCheckStyle(id){
            const index = this.arr.findIndex((item) => item.id == id)
            return this.inputStyle[index]
        }
        ,
        contentEdit(){

        },
        remove(){

        }
    },

    mounted() {
        this.reload()
    }
}
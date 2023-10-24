import { ref } from "vue"

export default {

    data() {
        return {
            listPage: false,
            emptyPage: true,
            inputValue: ref(''),
            arr: ref([]),
            checked: false
        }
    },

    methods: {
        reload() {
            console.log('reload')
            fetch('http://localhost:3000/api/list', {
                method: "GET"
            }).then((data) => data.json()).then((res) => {
                const result = res.result
                console.log(result)
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

            this.arr = ref(concatArr)
        },
        off(arr) {
            this.checked = false

            this.arr = ref(arr)
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
        },
        contentEdit(){

        },
        remove(){

        }
    },

    mounted() {
        this.reload()
    }
}
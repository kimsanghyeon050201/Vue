import { ref } from "vue"

export default {

    data() {
        return {
            listPage: false,
            emptyPage: true,
            inputValue: ref(''),
            arr: ref([]),
            inputStyle: ref([]),
            checked: false
        }
    },

    methods: {
        reload() {
            inputStyle = ref([])
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
                        if (data.state == 1) {
                            data.state = true
                        } else {
                            data.state = false
                        }
                    }).forEach(element => {
                          
                    });
                    


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
        stateEdit(id, state) {
            stateMap = state == true ? 1 : 0

            if (state == true) {

            } else {

            }
            fetch('http://localhost:3000/api/list/state/edit', {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "id": id,
                    "state": stateMap
                })
            }).then(() => {
                //스위치 온 오프 상태일때 체크박스 체크를 하면 바로 화면에 반영하기 위함
                this.reload()
            }).catch(err => {
                console.error(`err : ${err}`)
            })
        },
        contentEdit() {

        },
        remove() {

        }
    },

    mounted() {
        this.reload()
    }
}
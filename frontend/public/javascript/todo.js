import { ref } from "vue"

export default {

    data() {
        return {
            listPage: false,
            emptyPage: true,
            inputValue: ref(''),
            arr: [],
            checked: false,
            inputStyle: [],
            disabled: [],
            flagArr: [],
        }
    },

    methods: {
        reload() {

            this.inputStyle = []
            this.flagArr = []
            this.disabled = []

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

                    //database에는 state가 int여서 bool로 바꾸는 과정
                    result.map((data) => data.state = Boolean(data.state))


                    //database의 데이터 수 만큼 스타일, flag, disabled 배열 만들기
                    result.forEach(data => {

                        this.flagArr.push(false)
                        this.disabled.push(true)

                        if (data.state) {
                            this.inputStyle.push({
                                textDecoration: 'line-through',
                                opacity: 0.4,
                                border: 'none'
                            })
                        } else {
                            this.inputStyle.push({
                                textDecoration: 'none',
                                opacity: 1,
                                border: 'none'
                            })
                        }
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

            this.arr = arr

            //섞이는 arr에 맞춰 flag, inputStyle, disabled도 같이 맞춰줄려고 병합한 다음 따로 정렬하고 따로 추출
            //병합
            const newArr = this.arr
                .map((item, index) => ({
                    item,
                    flag: this.flagArr[index],
                    inputStyle: this.inputStyle[index],
                    disabled: this.disabled[index]
                }))

            //정령
            newArr.sort((a, b) => {
                if (a.item.state == true && b.item.state == false) return 1
                else if (a.item.state == false && b.item.state == true) return -1
                else return 0
            })

            //따로 추출
            this.arr = newArr.map((item) => item.item)
            this.flagArr = newArr.map((item) => item.flag)
            this.inputStyle = newArr.map((item) => item.inputStyle)
            this.disabled = newArr.map((item) => item.disabled)
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
        stateEdit(id, state) {

            const index = this.arr.findIndex((item) => item.id == id)

            this.inputStyle[index].textDecoration = state ? 'line-through' : 'none'
            this.inputStyle[index].opacity = state ? 0.4 : 1

            fetch('http://localhost:3000/api/list/state/edit', {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "id": id,
                    "state": state
                })
            }).then(() => {
                //스위치 온 오프 상태일때 체크박스 체크를 하면 바로 화면에 반영하기 위함
                this.reload()
            }).catch(err => {
                console.error(`err : ${err}`)
            })
        },
        getCheckStyle(id) {
            const index = this.arr.findIndex((item) => item.id == id)
            return this.inputStyle[index]
        }
        ,
        getDisabled(id) {
            const index = this.arr.findIndex((item) => item.id == id)
            return this.disabled[index]
        },
        contentEdit(id, content) {

            const index = this.arr.findIndex((item) => item.id == id)
            let flag = this.flagArr[index]
            this.inputStyle[index].border = 'none'
            this.disabled[index] = true

            if (!flag) {
                this.inputStyle[index].border = 'solid 0.5px black'
                this.disabled[index] = false
            } else {
                fetch("http://localhost:3000/api/list/content/edit", {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "id": id,
                        "content": content
                    })
                }).catch((err) => {
                    console.error(`err : ${err}`)
                })
            }

            flag ^= true
            this.flagArr[index] = Boolean(flag)
        },
        remove(id) {
            fetch("http://localhost:3000/api/list/delete", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "id": id
                })
            }).then((res) => {
                return res.json()
            }).then((data) => {
                this.reload()
            }).catch((err) => {
                console.error(`err : ${err}`)
            })
        },
        switchChange() {
            localStorage.setItem("onoff", this.checked)
            this.reload()
        }
    },

    mounted() {
        this.reload()
    }
}
var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!',
      data:'',
      Allcountries:'',
      Newdata:'',
      NewdataPu:'',
      SelectedCountry:'',
      NewdataAQ:{},
      hide:true
    },
    methods:{
        getData (){
            const vm = this
            const API = 'https://script.google.com/macros/s/AKfycbzl6KKgb4v2-F3SCVxVaXjnMwM_XQvnk2A08nw7NjmGfuRVmak0/exec?url=http://opendata2.epa.gov.tw/AQI.json'
            axios.get(API).then((response=>{
                vm.data = response.data
                let Countries =[]
                vm.data.forEach((item)=>{
                    Countries.push(item.County)
                })
                let country = []
                Countries.forEach((item)=>{
                    if(country.indexOf(item) == -1){
                        country.push(item)
                    }
                })
                vm.Allcountries = country
                // console.log(vm.data)
            }))
        },
        ChangeCountry(e){
            let vm = this
            vm.hide = false
            vm.SelectedCountry = e.target.value
            // console.log(e.target.value)
            let sorted = []
            vm.data.forEach((item)=>{
                if(item.County === e.target.value){
                    sorted.push(item)
                }
            })
            vm.Newdata = sorted
            vm.NewdataPu = sorted[0].PublishTime
            vm.NewdataAQ = {...sorted[0]}
            console.log(vm.NewdataAQ)
            console.log(vm.Newdata)
        }
    },
    created (){
        this.getData()
    }
  })
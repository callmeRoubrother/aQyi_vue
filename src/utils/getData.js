import axios from 'axios'
const getDate = (num) => {
  let Obj = {}
  axios.get('/aqiyi/h5/main/index/' + num + '/?callback=__jp15384869846750').then(res => {
    res = res.data
    res = res.split('(')[1].split(')')[0]
    const data = JSON.parse(res).data
    Object.assign(Obj, data)
    console.log(Obj)
  }).catch(err => console.log(err))
  console.log(Obj)
  return Obj
}
export default getDate

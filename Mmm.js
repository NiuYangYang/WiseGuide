import {observable, action} from 'mobx';

class Mmm {
    @observable textImages='';

    @action
    clearData=()=>{
        setTimeout(()=>this.textImages = 'ddddddd', 3000);
    };
}
export default new Mmm()
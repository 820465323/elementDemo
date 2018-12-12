<template>
  <el-container style="height: 100%">
    <!--顶栏-->
    <el-header style="border: 1px solid blue;width: 100%" id="el">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="border: 1px solid black" id="el2">
        <el-breadcrumb-item :to="{ path: '/rolePage' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <el-header style="border: 1px solid blue;width: 100%;height: 10%" id="el-nav">
      <el-button type="primary" size="small" id="el-nav2" @click="importExcel()">导入excel</el-button>
      <input type="file" @change="importf($event)" id="input-upload" style="display: none" value=""/>
      <el-button type="success" size="small" id="el-nav3" @click="dialogExportExcel = true">导出excel</el-button>

      <!--excel导出弹窗-->
      <el-dialog title="excel导出项" :visible.sync="dialogExportExcel">

        <el-tree
          :data="data2"
          show-checkbox
          default-expand-all
          node-key="id"
          ref="tree"
          highlight-current
          check-on-click-node
          :props="defaultProps">
        </el-tree>

        <div slot="footer" class="dialog-footer">
          <el-button type="success" size="small" id="el-nav44" @click="exportTest()">测试按钮</el-button>

          <el-button @click="dialogExportExcel = false;">取 消</el-button>
          <el-button type="primary" @click="dialogExportExcel = false;exportExcel()">确 定</el-button>
        </div>
      </el-dialog>

      <a href="" download="我是导出来的测试文件.xlsx" id="downloadA" style="display: none"></a>
    </el-header>
    <!--主体-->
    <el-main style="border: 1px solid blue;width:100%;height: 100%;" id="el3">
      <!--表格-->
      <el-table
        :data="tableData"
        ref="multipleTable"
        tooltip-effect="dark"
        style="width: 100%;" id="el4"
        stripe
        @selection-change="handleSelectionChange">
        <el-table-column
          fixed
          type="selection"
          width="55"
        >
        </el-table-column>
        <el-table-column
          fixed
          type="img"
          label="头像"
          width="100px"
        >
          <template slot-scope="scope">
            <img :src="scope.row.headPicture" height="100px" alt="图片不见了">
          </template>
        </el-table-column>
        <el-table-column
          type="index"
          label="序号"
          width="150">
        </el-table-column>
        <el-table-column
          prop="_id"
          label="id"
          width="150">
        </el-table-column>
        <el-table-column
          prop="username"
          label="用户名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          width="120">
        </el-table-column>
        <el-table-column
          prop="year"
          label="年龄"
          width="120">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          width="300">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="联系方式"
          width="120">
        </el-table-column>
        <el-table-column
          prop="loginLastTime"
          label="最后一次登陆"
          width="120">
        </el-table-column>
        <el-table-column
          prop="userRegistTime"
          label="注册时间"
          width="120">
        </el-table-column>
        <el-table-column
          prop="major"
          label="专业"
          width="120">
        </el-table-column>
        <el-table-column
          prop="nation"
          label="国籍"
          width="120">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" class="el-icon-edit"></el-button>
            <el-button type="text" class="el-icon-close" style="color: red"
                       @click="deleteMessages(scope.row._id)"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--分页器-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="num">
      </el-pagination>

      <!--自定义编辑框-->
      <el-dialog :visible.sync="dialogFormVisible" style="height: 100%;margin: auto" class="el-icon-edit">
        <div style="height: 50%;">
          <!--修改表单-->
          <form @submit.prevent="submit">
            <el-input placeholder="请输入真实姓名" type="text" name="username" v-model="inputValue._id" :disabled="true">
              <template slot="prepend">唯一标识</template>
            </el-input>

            <el-input placeholder="请输入真实姓名" type="text" name="username" v-model="inputValue.name"
                      style="margin-top: 15px">
              <template slot="prepend">真实姓名</template>
            </el-input>

            <el-input placeholder="请输入真实姓名" type="text" name="username" v-model="inputValue.username"
                      style="margin-top: 15px">
              <template slot="prepend">用户账号</template>
            </el-input>

            <el-input placeholder="请输入真实姓名" type="text" name="username" v-model="inputValue.address"
                      style="margin-top: 15px">
              <template slot="prepend">家庭住址</template>
            </el-input>

            <el-input placeholder="请输入真实姓名" type="text" name="username" v-model="inputValue.mobile"
                      style="margin-top: 15px">
              <template slot="prepend">联系方式</template>
            </el-input>

            <div style="display: inline-block;vertical-align: middle;margin-top: 15px">
              <!--修改头像和预览-->
              <img id="img-demo" :src="inputValue.headPicture" alt="没有图片" style="width: 150px;height: 150px;">
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div style="display: inline-block;vertical-align: middle;margin-top: 15px">
              <!--头像上传-->
              <el-upload
                class="upload-demo"
                drag
                ref="upload"
                :action="imgUrl"
                :auto-upload="false"
                :onChange="handlePreview"
                :on-preview="handlePreview2"
                :on-remove="handleRemove"
                list-type="picture"
                name="imgfile"
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              </el-upload>
            </div>

            <div slot="footer" class="dialog-footer" style="text-align: right">
              <el-button @click="dialogFormVisible = false" style="margin-top: 15px">取 消</el-button>
              <el-button type="primary" @click="dialogFormVisible = true;submit(inputValue._id)"
                         style="margin-top: 15px">确 定
              </el-button>
            </div>
          </form>
        </div>
      </el-dialog>

    </el-main>
  </el-container>
</template>

<script>
  import XLSX from 'xlsx'
  export default {
    name: 'homePage',
    data(){
      return {
        activeIndex: '1',
        activeIndex2: '1',
        dialogFormVisible: false,
        tableData: [],
        multipleSelection: [],
        inputValue: {},
        imgUrl: 'http://localhost:3000/images',
        dialogExportExcel: false,
        imgState: false,
        num:0,
        pageSize:5,
        numSkip:0,
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
        data2: [{
          label: '全选',
          children: [
            {
              label: "_id",
              disabled: true
            }
            , {
              label: 'name'
            }, {
              label: 'sex'
            }, {
              label: 'address'
            }, {
              label: "mobile"
            }, {
              label: "year"
            }, {
              label: "nation"
            }, {
              label: "major"
            }, {
              label: "username"
            }, {
              label: "headPicture"
            }
          ]
        }],
        defaultProps: {
          children: this.children,
          label: 'label'
        },
        treeArr:[]
      }
    },
    methods: {
        //每页展示条数
      handleSizeChange(val) {
        console.log(val);
        //每次点击更改条数值
        this.pageSize = val;
        this.axios.get('http://localhost:3000/userTable?number='+this.pageSize+'&skipPage='+this.numSkip).then((data)=>{
          this.tableData=[];
          for (let i = 0; i < data.data.length; i++) {
            this.tableData.push(data.data[i]);
          }
        });
      },
      //指定页码
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        //每次点击更改页码值
        this.numSkip = val;
        this.axios.get('http://localhost:3000/userTableSkip?skipPage='+this.numSkip+'&number='+this.pageSize).then((data)=>{
          this.tableData=[];
          for (let i = 0; i < data.data.length; i++) {
            this.tableData.push(data.data[i]);
          }
        });
      },
      exportTest(){
          console.log(this.$refs.tree.getCheckedNodes());
      },
      //多选框
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(this.multipleSelection);
      },
      //编辑框事件
      handleClick(row) {
        this.dialogFormVisible = true;
        this.inputValue = row;
      },
      //文件上传服务器文件夹
      submit(id){
        if (this.$refs.upload.uploadFiles.length > 1) {
          this.$message.error('只能上传一张头像');
          this.dialogFormVisible = true;
        } else if (this.$refs.upload.uploadFiles.length == 1) {
          console.log(this.inputValue.name);
          //提交form表单
          this.$refs.upload.submit();
          this.dialogFormVisible = false;
          let a = new Promise((resolve, reject) => {
            resolve(id)
          });

          let b = new Promise((resolve, reject) => {
            //上传后根据ID修改图片路径并返回文件名称,在这里需要延迟是因为无法和数据库同时同步操作
            setTimeout(() => {
              this.axios.get('http://localhost:3000/imagesUpdate?id=' + id).then((data) => {
                for (let i = 0; i < this.tableData.length; i++) {
                  if (this.tableData[i]._id == id) {
                    this.tableData[i].headPicture = 'http://localhost:3000/images/' + data.data;
                    console.log(this.tableData[i].headPicture);
                  }
                }
              });
            }, 300);
            resolve('success');
          });

          a.then((data) => {
            return b;
          }).catch((err) => {
            console.log(err);
          }).then((data) => {
            setTimeout(() => {
              //清空上传文件的暂存区
              this.$refs.upload.clearFiles();
            }, 500);
          })
        } else {
          this.$message.error('你没有选择头像');
          this.dialogFormVisible = false;
        }
      },
      //监听图片上传状态,用于回显
      handlePreview(file) {
        console.log(file.name);
        //图片验证,不是JPG/PNG格式则将该图片从this.$refs内的数组中删除
        for (let i = 0; i < this.$refs.upload.uploadFiles.length; i++) {
          if (this.$refs.upload.uploadFiles[i].name.indexOf('jpg') != -1 || this.$refs.upload.uploadFiles[i].name.indexOf('png') != -1) {
            this.$message.success('上传成功');
            //将该图片的url作为路径图片回显
            document.querySelector('#img-demo').src = file.url;
          } else {
            this.$message.error('上传头像图片只能是 JPG或PNG 格式!');
            //非法格式则删除
            this.$refs.upload.uploadFiles.splice(i, 1);
          }
        }
      },
      //动态展出上传的图片,实现点击切换
      handlePreview2(file){
        //element内置的方法,点击图片时获取url实时回显
        document.querySelector('#img-demo').src = file.url;
      },
      //删除图片
      handleRemove(file){
        this.$message.success('删除成功');
      },
      //删除用户信息
      deleteMessages(data){
        this.axios.get('http://localhost:3000/deleteMessages?id=' + data).then((data) => {
          console.log('删除成功', data);
        });
        //删除数据库中信息，为了同步表格数据，再将数组中改ID的信息删除
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i]._id == data) {
            this.tableData.splice(i, 1);
          }
        }
      },
      //导入excel
      importExcel(){
        console.log(this.data2[0].children[0]);
        //触发input上传事件
        document.querySelector('#input-upload').click();
      },
      importf(obj){

        let _this = this;
        let this_axios = this.axios;

        async function sub() {
          function one() {
            var wb;//读取完成的数据
            var rABS = false; //是否将文件读取为二进制字符串
            //vue中时间绑定this需要用$event,所以在这里需要用target取值
            if (!obj.target.files) {
              return false;
            }
            var f = obj.target.files[0];
            var reader = new FileReader();
            //文件读取完成时出发
            reader.onload = async function (e) {
              var data = e.target.result;
              wb = XLSX.read(data, {
                type: 'binary'
              });

              /*wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
               wb.Sheets[Sheet名]获取第一个Sheet的数据*/

              var excelJson = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
              console.log(wb.Sheets[wb.SheetNames[0]]);
              /*document.getElementById("excelContent").innerHTML= JSON.stringify( excelJson );*/
              //将读取的数据存放在excelJson数组中传递给后台服务端
              await this_axios.get('http://localhost:3000/users/userImport?arr=' + JSON.stringify(excelJson)).then((data) => {
                console.log('11111', data);
              });
              //再将数组清空重新插入数据
              await this_axios.get('http://localhost:3000/userTable').then((data) => {
                _this.tableData = [];
                for (let i = 0; i < data.data.length; i++) {
                  _this.tableData.push(data.data[i]);
                  console.log('33333', JSON.stringify(_this.tableData));
                }
              });
            };
            reader.readAsBinaryString(f);
            document.querySelector('#input-upload').value = '';
          }
          await one();
        }
        sub();
      },
      //导出excel
      exportExcel(){
        //清空数组并将树状控件中的名称加入新数组
        this.treeArr.splice(0,this.treeArr.length);
        for (let i = 0; i < this.$refs.tree.getCheckedNodes().length; i++) {
          this.treeArr.push(this.$refs.tree.getCheckedNodes()[i].label);
        }

        let arr;
        arr = this.tableData;
        let arr2 = [];

        //将选择的选项名称放入新数组arr2中再转为字符串
        for(let j = 0; j < this.treeArr.length; j++){
            arr2.push(this.treeArr[j]+',');
        }
        let strArr2 = JSON.stringify(arr2);

          //循环新数组取得key
          for(let arr_0 in arr[0]){
            for (let i = 0; i < arr.length; i++) {
                //如果值==-1则证明该值第一次出现，即为未选中,则可以删除
              if(strArr2.indexOf(arr_0)==-1){
                  console.log(arr_0,'不存在!');
                delete arr[i][arr_0];
              }
            }
          }

          downloadExl(arr);
          var tmpDown; //导出的二进制对象
          function downloadExl(json, type) {
            //根据json数据，获取excel的第一行(例如:姓名、年龄、性别)存至map
            var tmpdata = json[0];
            json.unshift({});
            var keyMap = []; //获取keys
            for (var k in tmpdata) {
              keyMap.push(k);
              json[0][k] = k;
            }

            var tmpdata = [];
            console.log(tmpdata,',,,,____________________tmpdata  ');
            json.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
              v: v[k],
              position: (j > 25 ? getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
            }))).reduce((prev, next) => prev.concat(next)).forEach((v, i) => tmpdata[v.position] = {
              v: v.v
            });
            console.log(tmpdata,',,,,++++++++++++++++++++++++++tmpdata  ');
            //设置区域,比如表格从A1到D10
            var outputPos = Object.keys(tmpdata);

            var tmpWB = {
              SheetNames: ['mySheet'], //保存的表标题
              Sheets: {
                'mySheet': Object.assign({},
                  tmpdata, //内容
                  {
                    '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] //设置填充区域
                  })
              }
            };

            //创建二进制对象写入转换好的字节流
            tmpDown = new Blob([s2ab(XLSX.write(tmpWB,
              {bookType: (type == undefined ? 'xlsx' : type), bookSST: false, type: 'binary'}//这里的数据是用来定义导出的格式类型
            ))], {
              type: ""
            });

            var href = URL.createObjectURL(tmpDown); //创建对象超链接
            document.getElementById("downloadA").href = href; //绑定a标签
            document.getElementById("downloadA").click(); //模拟点击实现下载
            setTimeout(function () { //延时释放
              URL.revokeObjectURL(tmpDown); //用URL.revokeObjectURL()来释放这个object URL
            }, 100);
          }

          //字符串转字符流
          function s2ab(s) {
            var buf = new ArrayBuffer(s.length);
            var view = new Uint8Array(buf);
            for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
            return buf;
          }

          //将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
          function getCharCol(n) {
            let temCol = '',
              s = '',
              m = 0;
            while (n > 0) {
              m = n % 26 + 1;
              s = String.fromCharCode(m + 64) + s;
              n = (n - m) / 26
            }
            return s
          }

      }
    },
    beforeCreate: function () {
      //判断登录标志进行拦截

      let user = sessionStorage.getItem('user');
      if (user == null) {
        alert('请先登录');
        this.$router.push({name: 'loginPage'});
      } else {
        this.axios.get('http://localhost:3000/userTable?number='+5).then((data) => {
          let date = new Date();
          let year = date.getFullYear();
          let month = date.getMonth() + 1;
          let date2 = date.getDate();
          let hours = date.getHours();
          let seconds = date.getSeconds();
          let minutes = date.getMinutes();
          let time = JSON.stringify(year + '-' + month + '-' + date2 + ' ' + hours + ':' + minutes + ':' + seconds);
          for (let i = 0; i < data.data.length; i++) {
            this.tableData.push(data.data[i]);
          }
        });

        this.axios.get('http://localhost:3000/users/total').then((data) => {
         this.num =  data.data
        });
      }
    },
    computed: {
      tableDataTotal: function () {
        let num = 0;
        num = this.tableData.length;
        return num;
      }
    }
  }
</script>
<style>
  #el-nav:after {
    content: "";
    display: inline-block;
    height: 100%;
    vertical-align: middle;
  }

  #el-nav2 {
    display: inline-block;
    vertical-align: middle;
  }
</style>

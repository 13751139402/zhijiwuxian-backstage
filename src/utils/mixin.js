/*
 * @Author: your name
 * @Date: 2019-12-05 11:46:13
 * @LastEditTime: 2019-12-05 18:14:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admit-template\src\mixin\list.js
 */

import Pagination from "@/components/Pagination";
let list = {
    data: function () {
        return {
            // -- 列表
            list: [], // 列表数据
            listLoading: false, // 列表加载数据
            // -- 分页
            total: 0, // 分页总数
            listQuery: {
                // 分页参数
                page: 1, // 页码
                page_size: 20, // 页码大小
            },
            dialogStatus: "create", // 弹出窗状态
            dialogFormVisible: false, // 弹出框是否显示
            buttonLoading: false,  // 弹出框按钮加载状态
            imageFile: false, // image保存的file数据
        }
    },
    components: {
        Pagination
    },
    computed: {
        server() { // image图片地址
            return this.$store.getters.server;
        },
    },
    methods: {
        /**
         * @description: 获取列表数据
         * @param {type} 
         * @return: 
         */
        selectData() {
            this.listLoading = true;
            if (this.select) {
                this.select().then(({ result }) => {
                    this.list = result.data;
                    this.listLoading = false;
                    this.total = result.total;
                });
            } else {
                this.$notify({
                    title: "失败",
                    message: "请在组件中添加select函数用于查询列表数据",
                    type: "error",
                    duration: 3000
                });
            }
        },
        createData() {
            this.$refs["dataForm"].validate(valid => {
                if (valid) {
                    this.buttonLoading = true;
                    this.create().then(() => {
                        this.selectData();
                        this.$notify({
                            title: "成功",
                            message: "添加成功",
                            type: "success",
                            duration: 1000,
                            onClose: () => {
                                this.dialogFormVisible = false;
                                this.buttonLoading = false;
                            }
                        });
                    });
                }
            });
        },
        updataData() {
            this.$refs["dataForm"].validate(valid => {
                if (valid) {
                    this.buttonLoading = true;
                    this.updata().then(() => {
                        this.selectData();
                        this.$notify({
                            title: "成功",
                            message: "添加成功",
                            type: "success",
                            duration: 1000,
                            onClose: () => {
                                this.dialogFormVisible = false;
                                this.resetTemp();
                                this.buttonLoading = false;
                            }
                        });
                    });
                }
            });
        },
        deleteData(temp) {
            this.$confirm("此操作将永久删除该福利, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    temp.del = 1;
                    this.delete(temp).then(() => {
                        this.selectData();
                        this.$notify({
                            title: "成功",
                            message: "删除成功",
                            type: "success",
                            duration: 1000,
                            onClose: () => {
                                this.dialogFormVisible = false;
                            }
                        });
                    })
                })
                .catch(err => {
                    this.$message({
                        type: "info",
                        message: `已取消删除 ${err}`
                    });
                });
        },
        // ------------- 逻辑层
        /**
         * @description: 重置弹窗内的数据
         */
        resetTemp() {
            this.temp = this.$options.data().temp;
        },
        /**
         * @description: 弹窗选择图片,保存图片file文件
         */
        beforeAvatarUpload({ file }) {
            // API 读取 本地文件
            var reader = new FileReader();
            // 将文件读取为base64的格式，也就是可以当成图片的src
            reader.readAsDataURL(file);

            // 读取文件成功后执行的方法函数
            reader.onload = e => {
                this.temp.image = e.target.result;
            };
            this.imageFile = file;
        },
        /**
         * @description: 显示弹出框，创建模式
         */
        handleCreate() {
            if (this.dialogStatus == "change") {
                this.resetTemp();
            }
            this.dialogStatus = "create";
            this.dialogFormVisible = true;
            this.$nextTick(() => {
                this.$refs["dataForm"].clearValidate();
            });
        },

        /**
         * @description: 显示弹出框，修改模式
         */
        handleEdit(temp) {
            this.dialogStatus = "change";
            this.dialogFormVisible = true;
            Object.assign(this.temp, temp);
            this.$nextTick(() => {
                this.$refs["dataForm"].clearValidate();
            });
        },
    },
    mounted() {
        this.selectData();
    }
}

export { list }
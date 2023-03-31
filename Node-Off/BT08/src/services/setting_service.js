const routerName = 'setting';
const renderName = `backend/page/${routerName}/`;

const SettingModel = require(`${__path_models}setting_model`)
const notify = require(`${__path_configs}notify`)

const fileHelpers = require(`${__path_helpers}file`)
const uploadAvatar = fileHelpers.upload('logo', `${__path_public}uploads/logo/`)

module.exports = {
    getSetting: async (req, res) => {
        let data = {}
        data = await SettingModel.find({})
        pageTitle = 'Settings Form'
        return {
            pageTitle,
            data
        }
    },
    saveSetting: async (req, res) => { // (NewData add, edit item)
        uploadAvatar(req, res, async (err) => {
            req.body = JSON.parse(JSON.stringify(req.body))
            let item = Object.assign(req.body)

            // onst {brand,logo }     = req.body 

            // const Logo_changr = await SettingModel.create({brand,logo }  )
            
            // res.send({
                
            //     Logo_changr
            // }) 

            if (err) {
                let errorArr = {}
                let data = {}

                if(err.code === 'LIMIT_FILE_SIZE') err = 'Kích thước file ko phù hợp'
                errorArr['avatar'] = [err]

                data = await SettingModel.find({})
                pageTitle = 'Edit - Form'
                
                res.render(`${renderName}form` , {
                    items : data,
                    pageTitle,
                    errorArr
                });
                return;
            } else {
                if(req.file == undefined){
                    item.logo = item.image_old;
                } else {
                    item.logo = req.file.filename;
                    fileHelpers.remove('src/public/uploads/logo/')
                }
                id = item.id;

                let data = {
                    footer:{},
                    social:{},
                    logo:{},
                }
    
                data.footer.copyright = item.Copyright
                data.footer.phone     = item.phone
                data.footer.location  = item.location
                data.footer.email     = item.email
    
                data.social.facebook  = item.facebook
                data.social.zalo      = item.zalo
                data.social.instagram = item.instagram
    
                data.logo.brand       = item.name_brand
                data.logo.logo        = item.logo

                SettingModel.updateOne({ _id: id }, data, (err, result) => {
                    req.flash('success', notify.EDIT_SUCCESS, false)
                    res.redirect('/admin/setting/')
                });
            }
        })
    },
}

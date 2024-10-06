import * as postService from '../services/post'

export const getPosts = async (req, res) => {
    try {
        const response = await postService.getPostsService()
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at post controller: ' + error
        })
    }
}
export const getPostsLimit = async (req, res) => {
    const { page, priceNumber, areaNumber, ...query } = req.query
    try {
        const response = await postService.getPostsLimitService(page, query, { priceNumber, areaNumber })
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at post controller: ' + error
        })
    }
}
export const getNewPosts = async (req, res) => {
    try {
        const response = await postService.getNewPostService()
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at post controller: ' + error
        })
    }
}

export const createNewPosts = async (req, res) => {
    const {categoryCode,  title, priceNumber, areaNumber, label} =req.body
    const { id }=req.user
    if(!categoryCode || !id || !title || !priceNumber || !areaNumber || !label) return res.status(400).json({
        err:1,
        msg:'Missing inputs'
    })
    try {
        const response = await postService.createNewPostService(req.body,id)
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at post controller: ' + error
        })
    }
}

export const getPostsLimitAdmin = async (req, res) => {
    const { page, ...query } = req.query
    const {id }= req.user
    try {

        if(!id) return res.status(400).json({
            err:1,
            msg:'Missing inputs'
        })

        const response = await postService.getPostsLimitAdminService(page, id, query)
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at post controller: ' + error
        })
    }
}

export const updatePost = async (req, res) => {
    const { postId, overviewId, imagesId, attributesId, ...payload } = req.body; // Dùng req.body nếu gửi thông qua POST
    const { id } = req.user;
   

    try {
        if (!postId || !id || !overviewId || !imagesId || !attributesId) {
            return res.status(400).json({
                err: 1,
                msg: 'Missing inputs'
            });
        }

        const response = await postService.updatePost( req.body); // Đảm bảo bạn truyền postId và req.body đúng cách
        console.log('Update response:', response);
        return res.status(200).json(response);

    } catch (error) {
        console.error('Error updating post:', error); // Ghi log lỗi chi tiết
        return res.status(500).json({
            err: -1,
            msg: 'Failed at post controller: ' + error.message || error // Chỉ lấy message từ error
        });
    }
}


export const deletePost = async (req, res) => {
    const { postId} = req.query; // Dùng req.body nếu gửi thông qua POST
    const { id } = req.user;

    try {
        if (!postId || !id ) {
            return res.status(400).json({
                err: 1,
                msg: 'Missing inputs'
            });
        }

        const response = await postService.deletePost(postId); // Đảm bảo bạn truyền postId và req.body đúng cách
        return res.status(200).json(response);

    } catch (error) {
        console.error('Error updating post:', error); // Ghi log lỗi chi tiết
        return res.status(500).json({
            err: -1,
            msg: 'Failed at post controller: ' + error.message || error // Chỉ lấy message từ error
        });
    }
}

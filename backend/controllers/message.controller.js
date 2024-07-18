export const sendMessage = async (req, res) => {
    try{
        const { message } = req.body
        const { id } = req.params
        const senderId = req.userId

    }catch(error){
        console.log('Error in send a message: ', error. message)
        res.status(500).send({error: 'Internal server error'})
    }   
}
import ratelimit from "../config/upstash.js";
const rateLimitor = async (req, res, next) => {
    try {
        const {success} = await ratelimit.limit("my-limit-key");

        if(!success){
            return res.status(429).json({
                message: "Too many request!!!"
            })
        }
        next();

    } catch (error) {
        console.log("Rate limit error", error);
          next(error);
    }
}



export default rateLimitor;
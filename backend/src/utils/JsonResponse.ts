export default function jsonResponse(status: number, data : any, message : string, error : boolean = false){
    return {
        status,
        data,
        message,
        error
    }
}
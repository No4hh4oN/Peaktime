import AxiosClient from "../AxiosClinet";

export async function getVotes() {
    return AxiosClient.get("/votes");
}
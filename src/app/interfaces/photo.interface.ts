export interface IPhoto {
    id: string,
    author: string,
    width: number,
    height: number,
    url: string,
    download_url: string,
    favorite?: boolean
}
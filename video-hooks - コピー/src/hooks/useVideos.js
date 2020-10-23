import {useState, useEffect} from 'react';
import youtube from '../apis/youtube';


// videosをfetchするのとmaintainするのに関係してるものをapp.jsよりとて来た
const useVideos = (defaultSearchTerm) => {
    
    const [videos, setVideos] = useState( [] );


    useEffect(() => {
        // 下の関数の引数は、input。input=他でもつかって、それに合わせた内容を書きたいもの。
        // 元は、'cat'と指定していたが、いろんなところでこのコードを使ときにcatsを表示したいわけじゃない。
        // だから、呼び出したときに各自入れたい文字をいれれるように、引数を指定。app,jsで呼び出すときに入れたいものをいれる
        search(defaultSearchTerm)
    }, [defaultSearchTerm])

    const search = async(term) => {
        // １APIにリクエスト
        // ２API取得後、内容を参照できるようにするために、asyncが必要。async→await→cont responseの順番で追加
        // console.log(response)してみればわかるが、responseの中身は、ビデオの情報。id　config dataなどとってきている。
        // axiosのpre-configured関数のget。第一引数でurl、第二引数でオプションを設定する
        const response = await youtube.get('/search', {
            params: {
                // qと呼べと、youtubeAPIに指定されている
                // 検索ワードにpropsとして渡ってきたtermを指定している
                q: term,
            }
        }
        )

        setVideos(response.data.items)
    }

        // arrayとして返す
        return [videos, search];
    };


export default useVideos
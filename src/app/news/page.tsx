'use client'
import NewsPage from '@/components/layout/newsPage/newsPage';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function Search (){
    const router = useSearchParams();
    const data = {
        _id: router.get('_id') as string,
        date: router.get('date') as string,
        destaque: router.get('destaque') ? true : false,
        imageID: router.get('imageID') as string,
        paragraph: router.get('paragraph') as string,
        title: router.get('title') as string
    }
    return (
        <NewsPage dataNews={data} origem='view'/>
    )
}
export default function Page() {     

    return(
        <Suspense>
            <Search />
        </Suspense>
    )
}
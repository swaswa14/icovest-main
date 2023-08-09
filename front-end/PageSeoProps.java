export interface PageSeoProps {
    title: string
    description: string
    keywords: string[]
    author?: string
}
export default function PageSeo({
    title,
    description,
    keywords,
    author = 'Joshua Salcedo',
}: PageSeoProps) {
    const appName = 'OF Manager'
    return (
        <Head>
            <title>{title}</title>
            <meta name={'description'} content={description} />
            <meta name={'keywords'} content={keywords.join(', ')} />
            <meta name={'author'} content={author} />
            <meta
                name={'viewport'}
                content={'width=device-width, initial-scale=1.0'}
            />
            <meta charSet={'UTF-8'} />
            <meta name={'application-name'} content={appName} />
            <meta name={'apple-mobile-web-app-capable'} content={'yes'} />
            <meta name={'robots'} content={'index, follow'} />

            <link rel={'icon'} href={'/favicon.ico'} />
        </Head>
    )
}
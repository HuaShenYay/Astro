import { PortableText } from "@portabletext/react";

interface PortableTextRendererProps {
  value: any;
}

export default function PortableTextRenderer({ value }: PortableTextRendererProps) {
  if (!value) return <p className="text-[#737373]">No content available.</p>;

  return (
    <PortableText 
      value={value}
      components={{
        block: {
          normal: ({children}) => (
            <p className="text-[#404040] leading-[1.75] text-base md:text-lg font-normal mb-6">
              {children}
            </p>
          ),
          h2: ({children}) => (
            <h2 className="text-2xl md:text-3xl font-bold mb-4 mt-8 text-[#262626]">
              {children}
            </h2>
          ),
          h3: ({children}) => (
            <h3 className="text-xl md:text-2xl font-bold mb-3 mt-6 text-[#262626]">
              {children}
            </h3>
          ),
        },
        marks: {
          link: ({children, value}) => (
            <a 
              href={value?.href} 
              className="text-[#262626] underline hover:text-[#525252] transition-colors"
              target={value?.blank ? '_blank' : undefined}
              rel={value?.blank ? 'noopener noreferrer' : undefined}
            >
              {children}
            </a>
          ),
        },
        types: {
          image: ({value}) => (
            <figure className="my-8">
              <img 
                src={value?.asset?.url} 
                alt={value?.alt || ''}
                className="w-full rounded-lg"
              />
              {value?.caption && (
                <figcaption className="text-sm text-[#737373] mt-2 text-center">
                  {value.caption}
                </figcaption>
              )}
            </figure>
          ),
        },
      }}
    />
  );
}



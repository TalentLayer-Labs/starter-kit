import { iBuilderPlacePalette } from '../modules/BuilderPlace/types';
import { themes } from '../utils/themes';

interface ContainerProps {
  onChange: (palette: string) => void;
}

function DefaultPalettes({ onChange }: ContainerProps) {
  return (
    <label className='block'>
      <span className='text-stone-800 font-bold text-md'>choose a color palette</span>

      <div className='flex flex-col gap-2'>
        {Object.keys(themes).map((value, index) => {
          return (
            <div className='mt-1'>
              <input
                type='radio'
                className='hidden peer'
                name='palette'
                id={`palette-${index}`}
                key={value}
                onChange={() => onChange(value)}
              />
              <label
                htmlFor={`palette-${index}`}
                className=' peer-checked:border-blue-500 border-2 border-solid rounded-lg flex flex-wrap items-center p-2 w-full'>
                <span className='block w-full mb-1'>{value} palette</span>
                {Object.keys(themes[value as keyof typeof themes]).map(color => {
                  return (
                    <div
                      className='group relative inline-block w-[36px] h-[36px] border'
                      style={{
                        backgroundColor:
                          themes[value as keyof typeof themes][color as keyof iBuilderPlacePalette],
                      }}>
                      <span className="absolute hidden group-hover:flex -top-2 -right-3 translate-x-full w-auto px-2 py-1 bg-gray-700 rounded-lg text-center text-white text-sm before:content-[''] before:absolute before:top-1/2  before:right-[100%] before:-translate-y-1/2 before:border-8 before:border-y-transparent before:border-l-transparent before:border-r-gray-700 z-50">
                        {color} <br />
                        {themes[value as keyof typeof themes][color as keyof iBuilderPlacePalette]}
                      </span>
                    </div>
                  );
                })}
              </label>
            </div>
          );
        })}
      </div>
    </label>
  );
}

export default DefaultPalettes;

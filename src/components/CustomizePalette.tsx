import { ColorPicker, IColor } from 'react-color-palette';
import { iBuilderPlacePalette } from '../modules/BuilderPlace/types';

interface ContainerProps {
  palette: iBuilderPlacePalette;
  color: IColor;
  setColor: (color: IColor) => void;
  setColorName: (colName: string) => void;
}

function CustomizePalette({ palette, color, setColor, setColorName }: ContainerProps) {
  return (
    <label className='block'>
      <span className='font-bold text-md'>customize your current palette</span>

      <div className='flex flex-col gap-2 mt-1'>
        <label className=' peer-checked:border-blue-500 border-2 border-solid rounded-lg flex flex-wrap items-center p-2 w-full'>
          {Object.keys(palette).map(color => {
            if (color !== '_id')
              return (
                <div
                  key={color}
                  className='group relative inline-block w-[36px] h-[36px] border'
                  style={{
                    backgroundColor: palette[color as keyof iBuilderPlacePalette],
                  }}
                  onClick={() => setColorName(color)}>
                  <span className="absolute hidden group-hover:flex -top-2 -right-3 translate-x-full w-auto px-2 py-1 bg-gray-700 rounded-lg text-center text-white text-sm before:content-[''] before:absolute before:top-1/2  before:right-[100%] before:-translate-y-1/2 before:border-8 before:border-y-transparent before:border-l-transparent before:border-r-gray-700 z-50">
                    {color} <br />
                    {palette[color as keyof iBuilderPlacePalette]}
                  </span>
                </div>
              );
          })}
          <div className='w-full mt-4'>
            <ColorPicker color={color} onChange={setColor} />
          </div>
        </label>
      </div>
    </label>
  );
}

export default CustomizePalette;

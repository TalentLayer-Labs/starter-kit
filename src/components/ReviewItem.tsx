import { IReview } from '../types';
import { formatDate } from '../utils/dates';

function ReviewItem({ review }: { review: IReview }) {
  if (!review) {
    return null;
  }

  return (
    <div className='flex flex-row gap-2 rounded-xl p-4 border border-info text-base-content bg-base-100  w-full'>
      <div className='flex flex-col items-top justify-between gap-4'>
        <div className='flex flex-col justify-start items-start gap-4'>
          <div className='flex items-center justify-start w-full  relative'>
            <img
              src={
                review.to.description?.image_url ||
                `/images/default-avatar-${Number(review.to.id) % 9}.jpeg`
              }
              className='w-10 mr-4 rounded-full'
              width={50}
              height={50}
              alt='default avatar'
            />
            <div className='flex flex-col'>
              <p className='text-base-content font-medium break-all'>{review.to.handle}</p>
              <p className='text-xs text-base-content opacity-50'>
                Review created the {formatDate(Number(review.createdAt) * 1000)}
              </p>
            </div>
          </div>

          <div className=' border-t border-info w-full'>
            <p className='text-sm text-base-content mt-4'>
              <strong>Rating:</strong> {review.rating}
            </p>
            <p className='text-sm text-base-content mt-4'>
              <strong>Message:</strong> {review.description?.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewItem;

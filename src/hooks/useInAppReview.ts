import { useCallback } from 'react';
import { requestAppReview, openStoreListing } from '../services/appReview';
import { useT } from './useT';

/**
 * Review prompts with the fallback dialog in the user's app language.
 *
 *   const { requestReviewAfterSuccess } = useInAppReview();
 *   // after a positive action, e.g. a finished jaap round:
 *   requestReviewAfterSuccess();
 */
export function useInAppReview() {
    const { T } = useT();

    /** Throttled (90 days). Call only right after something went well for the user. */
    const requestReviewAfterSuccess = useCallback(
        () => requestAppReview({
            title: T('review_title'),
            message: T('review_message'),
            rate: T('review_rate'),
            later: T('review_later'),
        }),
        [T]
    );

    return {
        requestReviewAfterSuccess,
        /** Unthrottled: for an explicit "Rate this app" button the user tapped. */
        openStoreListing,
    };
}

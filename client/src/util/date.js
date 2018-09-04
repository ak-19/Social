import moment from 'moment';

export const formatPostTime = (d) => {
    const timePassed = moment(d).fromNow();
    if (timePassed.includes('minute') || timePassed.includes('hour') || timePassed.includes('second')){
        return timePassed;
    }
    return moment(new Date(d)).format('MMMM Do YYYY, h:mm:ss a');
};

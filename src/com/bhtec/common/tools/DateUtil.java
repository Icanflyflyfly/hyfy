package com.bhtec.common.tools;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 功能说明：
 *
 * @auther liubf
 * @date 2017/11/3
 * @throws
 */
public class DateUtil {
    /**
     * date to string
     */
    public static String dateToString(Date date, String pattern){
        if(date == null)return null;
        SimpleDateFormat sdf = new SimpleDateFormat(pattern);
        return sdf.format(date);
    }
}

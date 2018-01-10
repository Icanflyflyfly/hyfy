package com.bhtec.common.tools;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFDateUtil;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.hssf.util.Region;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.FormulaEvaluator;

/**
 * 文件操作类
 * 
 * @author Firecrow
 * 
 */
public class FileUtil {

	private static final Logger logger = Logger.getLogger(FileUtil.class);


	/**
	 * 功能：导出Excel文件
	 * 
	 * @param titles
	 * @param list
	 * @author Liubaofeng
	 */
	public static void exportExcel(String[][] titles, List<String[]> list,
			String sheetName, String fileName, HttpServletResponse response) {

		// 创建工作簿
		HSSFWorkbook workbook = new HSSFWorkbook();
		// 创建Sheet
		HSSFSheet sheet = workbook.createSheet(sheetName);

		// 创建Title
		createTitle(titles,sheetName,workbook, sheet);
		// 插入内容
		createCell(titles, list, workbook, sheet);
		// 输出
		outputExcel(workbook, fileName, response);
	}
	

	public static void outputExcel(HSSFWorkbook workbook, String fileName,
			HttpServletResponse response) {
		try {
			if (workbook != null) {
				response.setContentType("application/ms-excel");
				response.setHeader("Content-Disposition",
						"attachment;filename="
								+ new String(fileName.getBytes(), "ISO-8859-1"));
				response.setContentType("text/html;charset=UTF-8");
				workbook.write(response.getOutputStream());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static void createTitle(String[][] titles,String name,HSSFWorkbook workbook, HSSFSheet sheet) {
		// 创建Cell标题样式
		HSSFCellStyle styleTitle = titleStyle(workbook);
		// 创建标题行
		HSSFRow row = sheet.createRow(0);
		// 设置行高
		row.setHeight((short) 700);
		// 合并单元格
		Region region = new Region(0,(short)0,(short)0,(short)(titles.length-1));
		sheet.addMergedRegion(region);
		HSSFCell cell0 = row.createCell(0);
		// 设置标题名称
		cell0.setCellValue(name);
		// 添加单元格样式
		cell0.setCellStyle(titleStyle2(workbook));
		
		// 创建标题行
		HSSFRow row1 = sheet.createRow(1);
		// 设置行高
		row1.setHeight((short) 350);
		// 设置标题
		for (int i = 0; i < titles.length; i++) {

			HSSFCell cell1 = row1.createCell(i);
			// 设置标题名称
			cell1.setCellValue(titles[i][0]);
			// 添加单元格样式
			cell1.setCellStyle(styleTitle);
			// 设置单元格列宽
			sheet.setColumnWidth(i, Short.parseShort(titles[i][1].trim()));
		}
	}

	public static void createCell(String[][] titles, List<String[]> list,
		HSSFWorkbook workbook, HSSFSheet sheet) {
		// 创建Cell文本样式
		HSSFCellStyle styleContent = contentStyle(workbook);
		// 创建Cell标题样式
		HSSFCellStyle styleTitle = titleStyle(workbook);
		HSSFCellStyle sumTitle = sumStyle(workbook);
		// 插入数据
		for (int j = 0; j < list.size(); j++) {
			HSSFRow rowData = sheet.createRow(j + 2);
			rowData.setHeight((short) 350); // 设置行高
			String[] data = list.get(j);
			for (int i = 0; i < titles.length; i++) {
				sheet.setColumnWidth(i, Short.parseShort(titles[i][1]));// 设置列宽
				HSSFCell cell = rowData.createCell(i); // 生成列
				cell.setCellValue(data[i]); // 插入值
				
				String val = data[0];
				if("合计".equals(val)){
					cell.setCellStyle(styleTitle); // 样式
				}else if("小计".equals(val)){
					cell.setCellStyle(sumTitle); // 样式
				}else{
					cell.setCellStyle(styleContent); // 样式
				}
			}
		}
	}

	/**
	 * 功能： 获取单元格的值
	 * 
	 * @param evaluator
	 * @param cell
	 * @return
	 * @author:Liubaofeng
	 * @create date:2012-12-19
	 * @modified:Liubaofeng
	 * @modified date:2012-12-19
	 */
	public static String getCellValue(FormulaEvaluator evaluator, Cell cell) {
		String fieldValue = "";
		if (cell != null) {
			switch (evaluator.evaluateInCell(cell).getCellType()) {
			case Cell.CELL_TYPE_STRING: // 字符串
				fieldValue = cell.getStringCellValue();
				break;
			case Cell.CELL_TYPE_BOOLEAN: // bool型
				fieldValue = cell.getBooleanCellValue() + "";
				break;
			case Cell.CELL_TYPE_NUMERIC: // 数值型
				if (HSSFDateUtil.isCellDateFormatted(cell)) { // 日期类型
					// 把Date转换指定格式的日期字符串
					fieldValue = DateUtil.dateToString(cell.getDateCellValue(),
							"yyyy-MM-dd");
				} else {
					BigDecimal bc = new BigDecimal(cell.getNumericCellValue());
					fieldValue = bc.toString();
				}
				break;
			case Cell.CELL_TYPE_BLANK: // 空
				fieldValue = "";
				break;
			case Cell.CELL_TYPE_ERROR:
				fieldValue = cell.getErrorCellValue() + "";
				break;
			case Cell.CELL_TYPE_FORMULA:
				fieldValue = "";
				break;
			}
		}
		return fieldValue;
	}

	/**
	 * 设定title的cell的style
	 * 
	 * @param workbook
	 * @return
	 */
	private static HSSFCellStyle titleStyle(HSSFWorkbook workbook) {
		// 创建Cell标题样式
		HSSFCellStyle titleStyle = workbook.createCellStyle();
		titleStyle.setFillBackgroundColor(HSSFColor.GREY_25_PERCENT.index);// 设定单元个背景颜色
		titleStyle.setFillPattern(HSSFCellStyle.VERTICAL_CENTER); // 设定此样式的的背景颜色填充
		titleStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER); // 居中对齐
		titleStyle.setFillForegroundColor(HSSFColor.BLUE_GREY.index); // 设置单元格显示颜色：淡紫色

		titleStyle.setBorderBottom(HSSFCellStyle.BORDER_THIN); // 下边框
		titleStyle.setBorderLeft(HSSFCellStyle.BORDER_THIN); // 左边框
		titleStyle.setBorderRight(HSSFCellStyle.BORDER_THIN); // 右边框
		titleStyle.setBorderTop(HSSFCellStyle.BORDER_THIN); // 上边框
		titleStyle.setBottomBorderColor(HSSFColor.BLACK.index);

		HSSFFont fontTitle = workbook.createFont();
		fontTitle.setColor(HSSFColor.WHITE.index); // 颜色
		fontTitle.setFontName("宋体"); // 字体
		fontTitle.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);// 加粗
		fontTitle.setFontHeightInPoints((short) 11); // 字号
		titleStyle.setFont(fontTitle);
		return titleStyle;
	}
	private static HSSFCellStyle titleStyle2(HSSFWorkbook workbook) {
		// 创建Cell文本样式
		HSSFCellStyle contentStyle = workbook.createCellStyle();
		contentStyle.setFillPattern(HSSFCellStyle.NO_FILL); // 设定此样式的的背景颜色填充
		contentStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER); // 居中对齐
		contentStyle.setBorderBottom(HSSFCellStyle.BORDER_THIN); // 下边框
		contentStyle.setBorderLeft(HSSFCellStyle.BORDER_THIN); // 左边框
		contentStyle.setBorderRight(HSSFCellStyle.BORDER_THIN); // 右边框
		contentStyle.setBorderTop(HSSFCellStyle.BORDER_THIN); // 上边框
		contentStyle.setBottomBorderColor(HSSFColor.BLACK.index);

		HSSFFont fontContent = workbook.createFont();
		fontContent.setColor(HSSFColor.BLACK.index); // 颜色
		fontContent.setFontName("宋体"); // 字体
		fontContent.setFontHeightInPoints((short) 18); // 字号
		contentStyle.setFont(fontContent);
		return contentStyle;
	}
	private static HSSFCellStyle sumStyle(HSSFWorkbook workbook) {
		// 创建Cell标题样式
		HSSFCellStyle titleStyle = workbook.createCellStyle();
		titleStyle.setFillBackgroundColor(HSSFColor.GREY_25_PERCENT.index);// 设定单元个背景颜色
		titleStyle.setFillPattern(HSSFCellStyle.VERTICAL_CENTER); // 设定此样式的的背景颜色填充
		titleStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER); // 居中对齐
		titleStyle.setFillForegroundColor(HSSFColor.TAN.index); // 设置单元格显示颜色：淡橙色

		titleStyle.setBorderBottom(HSSFCellStyle.BORDER_THIN); // 下边框
		titleStyle.setBorderLeft(HSSFCellStyle.BORDER_THIN); // 左边框
		titleStyle.setBorderRight(HSSFCellStyle.BORDER_THIN); // 右边框
		titleStyle.setBorderTop(HSSFCellStyle.BORDER_THIN); // 上边框
		titleStyle.setBottomBorderColor(HSSFColor.BLACK.index);

		HSSFFont fontTitle = workbook.createFont();
		fontTitle.setColor(HSSFColor.BLACK.index); // 颜色
		fontTitle.setFontName("宋体"); // 字体
		fontTitle.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);// 加粗
		fontTitle.setFontHeightInPoints((short) 11); // 字号
		titleStyle.setFont(fontTitle);
		return titleStyle;
	}
	/**
	 * 设定content的cell的style
	 * 
	 * @param workbook
	 * @return
	 */
	private static HSSFCellStyle contentStyle(HSSFWorkbook workbook) {
		// 创建Cell文本样式
		HSSFCellStyle contentStyle = workbook.createCellStyle();
		contentStyle.setFillPattern(HSSFCellStyle.NO_FILL); // 设定此样式的的背景颜色填充
		contentStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER); // 居中对齐
		contentStyle.setBorderBottom(HSSFCellStyle.BORDER_THIN); // 下边框
		contentStyle.setBorderLeft(HSSFCellStyle.BORDER_THIN); // 左边框
		contentStyle.setBorderRight(HSSFCellStyle.BORDER_THIN); // 右边框
		contentStyle.setBorderTop(HSSFCellStyle.BORDER_THIN); // 上边框
		contentStyle.setBottomBorderColor(HSSFColor.BLACK.index);

		HSSFFont fontContent = workbook.createFont();
		fontContent.setColor(HSSFColor.BLACK.index); // 颜色
		fontContent.setFontName("宋体"); // 字体
		fontContent.setFontHeightInPoints((short) 9); // 字号
		contentStyle.setFont(fontContent);
		return contentStyle;
	}
}

package com.huyali;

import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;

import com.swetake.util.Qrcode;

public class testCreateCode {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		String data = "һ������Ա��΢�Ź����˺�";
		/**
		* ���ɶ�ά��
		*/
		testCreateCode.encode(data, "D:/test/���ɶ�ά��.JPG");
	}

	private static boolean encode(String srcValue, String qrcodePicfilePath){
		int MAX_DATA_LENGTH = 200;
		     byte[] d = srcValue.getBytes();
		     int dataLength = d.length;
		     int imageWidth = 113; 
		     int imageHeight = imageWidth;
		     BufferedImage bi = new BufferedImage(imageWidth, imageHeight,BufferedImage.TYPE_INT_RGB);
		     Graphics2D g = bi.createGraphics();
		     g.setBackground(Color.WHITE);
		     g.clearRect(0, 0, imageWidth, imageHeight);
		     g.setColor(Color.BLACK);
		     if (dataLength > 0 && dataLength <= MAX_DATA_LENGTH) {
		        Qrcode qrcode = new Qrcode();
		        qrcode.setQrcodeErrorCorrect('M'); 
		        qrcode.setQrcodeEncodeMode('B'); 
		        qrcode.setQrcodeVersion(5);
		        boolean[][] b = qrcode.calQrcode(d);
		        int qrcodeDataLen = b.length;
		        for (int i = 0; i < qrcodeDataLen; i++) {
		           for (int j = 0; j < qrcodeDataLen; j++) {
		              if (b[j][i]) {
		                 g.fillRect(j * 3 + 2, i * 3 + 2, 3, 3); 
		              }
		           }
		        }
		        System.out.println("��ά��ɹ����ɣ���");
		     } else {
		        System.out.println( dataLength +"����"+ MAX_DATA_LENGTH);
		        return false;
		     }
		     g.dispose();
		     bi.flush();
		     File f = new File(qrcodePicfilePath);
		     String suffix = f.getName().substring(f.getName().indexOf(".")+1, f.getName().length());
		     System.out.println("��ά������ɹ�����");
		     try {
		        ImageIO.write(bi, suffix, f);
		     } catch (IOException ioe) {
		        System.out.println("��ά������ʧ��" + ioe.getMessage());
		        return false;
		     }
		return true;
		}
}

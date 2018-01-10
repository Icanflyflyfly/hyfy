@echo ---------------------------------------------------------------------------
@echo -- Windows �� postgreSQL ����ά���ű�----
@echo ---------------------------------------------------------------------------
 
rem ˵����
rem 1����������������������ݿ����ȫ���ݣ�
rem 2���ɴﵽָ������ά��������ָ�����ݸ�����Ŀ�ģ����Զ�̿ɴﵽԶ�̱��ݵ�Ŀ�ģ�
rem 3���ڱ��ļ����趨�������������ٴ��������ݿ����룻
rem 4����Ҫʱʹ��ѹ�����ܹ��ܣ�
rem 5���������ƻ���Ӧ������������
rem 6����Ϊ�ƻ�����ɶ�ʱ�Զ����У�
rem under WINDOWS 2003��
rem    SCHTASKS /Create /TN postgreSQL_auto_backup /TR E:\pgSQL_Backup\postgreSQL_auto_backup.bat /SC HOURLY /MO 1 /ST 00:00 /SD 2017/01/01 /ED 2012/01/01 /RU "NT AUTHORITY\SYSTEM"
rem    under Win7��
rem    SCHTASKS /Create /TN postgreSQL_auto_backup /TR E:\pgSQL_Backup\postgreSQL_auto_backup.bat /SC HOURLY /MO 1 /ST 00:00 /ET 23:59 /SD 2017/01/01 /ED 2012/01/01 /RU "NT AUTHORITY\SYSTEM" /Z

rem 7�����ݿ�ָ�ʱ�÷���
rem    ..\bin > dropdb -U postgres postgres
rem    ..\bin > psql -U postgres -f E:\pgSQL_Backup\postgres_20170305_120000.sql -d template1


@echo off
rem ��ָ������
rem ָ��pgsql�������ݵ��û������룬��һ�ַ�ʽ���޸�pg_hba.conf����֤��ʽ��

rem �û���
set PGUSER=postgres

rem ����
set PGPASSWORD=123456

rem ָ�����ݱ�������
set preservable_Num=800

rem ָ���������ݿ⣬������webdb
set backup_DB=bhtec

rem ����ǰ׺���������������Ŀ�����ݿ���Ϊǰ׺
set iPrefix=bhtec

rem ����Ŀ¼���������пո񣬱��ⲻͬ����������
set backup_to_Dir=E:\my\myProjectBackup\%date:~0,4%-%date:~5,2%-%date:~8,2%

rem pg_dump.exe�ľ���·��
set pg_dump_PATH="C:\Program Files\PostgreSQL\8.4\bin\pg_dump.exe"


rem vacuumdb.exe�ľ���·��
set vacuumdb_PATH="C:\Program Files\PostgreSQL\8.4\bin\vacuumdb.exe"


rem ��7zѹ�����˴�ָ��7z.exe�ľ���·��
set zip_PATH=C:\Program Files\7-zip\7z.exe

rem ���������
set ierr="0"
set verr="0"
set zerr="0"
set derr="0"
IF NOT EXIST %pg_dump_PATH% set ierr="1"
IF NOT EXIST %vacuumdb_PATH% set verr="1"
IF NOT EXIST "%zip_PATH%" set zerr="1"
IF NOT EXIST %backup_to_Dir% MKDIR "%backup_to_Dir%"
IF NOT EXIST %backup_to_Dir% set derr="1"

:Dir_check
IF %derr%=="0" goto pg_dump_check
ECHO %date% %time% backup_to_Dir Err!@ %backup_to_Dir% >> pg_bak_Err.txt
goto end

:pg_dump_check
IF %ierr%=="0" goto vacuumdb_check
ECHO %date% %time% pg_dump_PATH Err or pg_dump.exe file lost!@ %pg_dump_PATH% >> pg_bak_Err.txt
goto end

:vacuumdb_check
IF %verr%=="0" goto start
ECHO %date% %time% vacuumdb_PATH Err or vacuumdb.exe file lost!@ %vacuumdb_PATH% >> pg_bak_Err.txt
goto end

:zip_check
IF %zerr%=="0" goto start
ECHO %date% %time% zip_PATH Err or 7-zip.exe file lost!@ %zip_PATH% >> pg_bak_Err.txt
goto end

:start
set date_str=%date:~0,4%%date:~5,2%%date:~8,2%
if "%time:~0,1%"==" " (set time_str=0%time:~1,1%%time:~3,2%%time:~6,2%) ELSE (set time_str=%time:~0,2%%time:~3,2%%time:~6,2%)
set dbback_file=%iPrefix%_%date_str%

rem pg���� ������ѡһ
%pg_dump_PATH% -i -h localhost -p 5432 -F c -b -v -f "%backup_to_Dir%\%dbback_file%.backup" %backup_DB%
%pg_dump_PATH% -C -h localhost -p 5432 -f %backup_to_Dir%\%dbback_file%.sql %backup_DB%

rem pg����ά��
%vacuumdb_PATH% -h localhost -p 5432 -d %backup_DB% -q

rem ֻ����ָ���������ݣ������ޱ�Ҫѹ��������Ӧ82,83�У�����ѡһ
rem For /F "SKIP=%preservable_Num%" %%i IN ('DIR "%backup_to_Dir%%iPrefix%_*.backup" /B /TC /O-D') DO DEL "%backup_to_Dir%%%i" /Q
rem For /F "SKIP=%preservable_Num%" %%i IN ('DIR "%backup_to_Dir%%iPrefix%_*.sql" /B /TC /O-D') DO DEL "%backup_to_Dir%%%i" /Q

rem ����Ϊ��ѹ��Backup�ļ���7zip.��Dell .Backup�ļ�
rem %zip_PATH% a -ptjjtDs -t7z "%dbback_file%.7z" "%dbback_file%.backup" -m0=BCJ -m1=LZMA:d=21 -ms -mmt 
rem For /F "SKIP=%preservable_Num%" %%i IN ('DIR "%backup_to_Dir%%iPrefix%_*.7z" /B /TC /O-D') DO DEL "%backup_to_Dir%%%i" /Q
rem del "%dbback_file%.backup" /Q

rem ����Ϊ��ѹ��Backup�ļ���RAR.��Dell .Backup�ļ���(ȷ�����Ѿ���װ��winrar�������û�а�װ��Ĭ��Ŀ¼�������winrar�ļ���λ���޸�·��)
rem @if exist F:\pgSQLBak\%Dirname%\%Filename% (%ProgramFiles%\winrar\winrar a -df F:\pgSQLBak\%Dirname%\%Filename%.rar F:\pgSQLBak\%Dirname%\%Filename%)
:end
rem 
rem ���������ݿ�ָ�ʵ��
rem C:/Program Files/PostgreSQL/8.4/bin\pg_restore.exe --host localhost --port 5432 --username postgres --dbname t --verbose "D:\postgresqlDbBackup\bhtec_20110121_105200.backup"
@echo on
@echo ---------------------------------------------------------------------------
@echo -- postgreSQL ���ݳɹ�----
@echo ---------------------------------------------------------------------------
@echo ---------------------------------------------------------------------------
@echo -- mySql    ���ݿⱸ��----
@echo ---------------------------------------------------------------------------

cd C:\Program Files\MySQL\MySQL Server 5.1\bin
C:
mysqldump --opt -uroot -p123456 bhtec>%backup_to_Dir%\%dbback_file%_m.sql
exit
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:fo="http://www.w3.org/1999/XSL/Format" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	version="1.0">
	<xsl:param name="lang">fr</xsl:param>
	<xsl:param name="tree">0</xsl:param>
	<xsl:param name="publish">0</xsl:param>
	<xsl:param name="url" />
	<xsl:param name="url-appli" />
	<xsl:param name="ppath" />


	<!--xsl:include href="../../karuta/xsl/xmlportfolio2fo_base.xsl" />
	<xsl:include href="../../karuta/xsl/commonFunctions.xsl" /-->
	<xsl:include href="commonFunctions.xsl" />
	<xsl:include href="xmlportfolio2fo_base.xsl" />



	<xsl:template match="/">
		<fo:root font-size="10pt">
			<fo:layout-master-set>
				<fo:simple-page-master master-name="default-sequence"
					page-height="11in" page-width="8.5in" margin-left="2cm"
					margin-right="1.8cm" margin-top="2cm" margin-bottom="1cm">
					<fo:region-body region-name="Content" margin-bottom="0.7in" />
					<fo:region-after region-name="Footer" extent="0.4in" />
				</fo:simple-page-master>
			</fo:layout-master-set>
			<xsl:call-template name="cv" />
		</fo:root>
	</xsl:template>


	<!-- ========================================== -->
	<xsl:template name="cv">
	<!-- ========================================== -->
		<xsl:variable name="name">
			<xsl:value-of select="//asmContext[metadata/@semantictag='lastname']/asmResource[@xsi_type='Field']/text" /><xsl:text> </xsl:text><xsl:value-of select="//asmContext[metadata/@semantictag='firstname']/asmResource[@xsi_type='Field']/text" />
		</xsl:variable>
		<fo:page-sequence master-reference="default-sequence" id="{generate-id(.)}">
			<fo:static-content flow-name="Footer" font-size="9pt">
				<fo:block>
					CV - <xsl:value-of select="$name" />
				</fo:block>
				<fo:block text-align="right" margin-top="-10pt">
					-
					<fo:page-number />
					-
					<xsl:value-of select="/asmRoot/date" />
				</fo:block>
			</fo:static-content>
			<fo:flow flow-name="Content">
				<fo:table width="100%">
					<fo:table-column column-width="*"/>
					<fo:table-column column-width="100px"/>
					<fo:table-body>
						<fo:table-row>
								<fo:table-cell>
									<fo:block >
										<xsl:variable name='src'>
											<xsl:value-of select="$url-appli"/>/iut2/application/img/europass.jpg
										</xsl:variable>
										<fo:external-graphic vertical-align="middle" content-width="scale-to-fit" width="100px" scaling="uniform">
											<xsl:attribute name="src"><xsl:value-of select="$src"/></xsl:attribute>
										</fo:external-graphic>
									</fo:block>
								</fo:table-cell>
								<fo:table-cell>
									<fo:block text-align='right'>
											<xsl:variable name="qrcode">
												<xsl:value-of select="//asmContext[metadata/@semantictag='qrcode']/asmResource[@xsi_type='Field']/text" />
											</xsl:variable>
											<fo:external-graphic vertical-align="middle" content-width="scale-to-fit" width="100px" scaling="uniform">
												<xsl:attribute name="src">url('<xsl:value-of select="$qrcode"/>')</xsl:attribute>
											</fo:external-graphic>
									</fo:block>
									<fo:block text-align='justify' font-size="8pt">
											flashez-moi pour afficher ma carte personnelle interactive
									</fo:block>
								</fo:table-cell>
						</fo:table-row>
					</fo:table-body>
				</fo:table>

				<fo:table width="100%">
					<fo:table-column column-width="30%"/>
					<fo:table-column column-width="70%"/>
					<fo:table-body>
							<xsl:call-template name="info-perso" />
							<xsl:call-template name="emploi-vise" />
							<xsl:call-template name="experiences-label" />
							<xsl:call-template name="experiences" />
							<xsl:call-template name="experiences-perso-label" />
							<xsl:call-template name="experiences-perso" />
							<xsl:call-template name="education-label" />
							<xsl:call-template name="educations" />
							<xsl:call-template name="competences-label" />
							<xsl:call-template name="mother-tongue" />
							<xsl:call-template name="other-tongue" />
							<xsl:call-template name="competences-metiers" />
							<xsl:call-template name="competences-transversales" />
							<xsl:call-template name="competences-autres" />
							<xsl:call-template name="interets" />
					</fo:table-body>
				</fo:table>

			</fo:flow>
		</fo:page-sequence>
	</xsl:template>
	
	<!-- ========================================== -->
	<xsl:template name="info-perso">
	<!-- ========================================== -->
		<xsl:variable name="name">
			<xsl:value-of select="//asmContext[metadata/@semantictag='lastname']/asmResource[@xsi_type='Field']/text" /><xsl:text> </xsl:text><xsl:value-of select="//asmContext[metadata/@semantictag='firstname']/asmResource[@xsi_type='Field']/text" />
		</xsl:variable>
		<xsl:variable name="address">
			<xsl:value-of select="//asmContext[metadata/@semantictag='address']/asmResource[@xsi_type='Field']/text" />
		</xsl:variable>
		<xsl:variable name="phone">
			<xsl:value-of select="//asmContext[metadata/@semantictag='phone']/asmResource[@xsi_type='Field']/text" />
		</xsl:variable>
		<xsl:variable name="email">
			<xsl:value-of select="//asmContext[metadata/@semantictag='email']/asmResource[@xsi_type='Field']/text" />
		</xsl:variable>
		<xsl:variable name="website">
			<xsl:value-of select="//asmContext[metadata/@semantictag='website']/asmResource[@xsi_type='Field']/text" />
		</xsl:variable>
		<xsl:variable name="sex">
			<xsl:value-of select="//asmContext[metadata/@semantictag='sex']/asmResource[@xsi_type='Get_Resource']/label" />
		</xsl:variable>
		<xsl:variable name="citizenship">
			<xsl:value-of select="//asmContext[metadata/@semantictag='citizenship']/asmResource[@xsi_type='Field']/text" />
		</xsl:variable>
		<xsl:variable name="driver_license">
			<xsl:value-of select="//asmContext[metadata/@semantictag='driver_license']/asmResource[@xsi_type='Field']/text" />
		</xsl:variable>
		<fo:table-row>
				<fo:table-cell  padding-top='5pt' padding-right='5pt'>
				<fo:block  text-align='right' space-before="6pt" color="#909090"><fo:inline font-size="12pt">I</fo:inline>NFORMATION PERSONNELLES</fo:block>
				<xsl:variable name='uuid'>
					<xsl:value-of select="//asmContext[metadata/@semantictag='photo']/@id"/>
				</xsl:variable>
				<xsl:if test="not($uuid='')">
					<fo:block  text-align='right' space-before="6pt">
						<xsl:variable name='src'>
							<xsl:value-of select="$url"/>/resources/resource/file/<xsl:value-of select="//asmContext[metadata/@semantictag='photo']/@id"/>?lang=<xsl:value-of select="$lang"/>&amp;size=S
						</xsl:variable>
						<fo:external-graphic vertical-align="middle" padding-left="5pt" content-width="scale-to-fit" width="50%" scaling="uniform">
							<xsl:attribute name="src"><xsl:value-of select="$src"/></xsl:attribute>
						</fo:external-graphic>	
					</fo:block>
				</xsl:if>
			</fo:table-cell>
				<fo:table-cell  padding-top='5pt' padding-right='5pt'>
				<fo:block font-size="11pt" font-weight="bold" space-before="12pt">
					<xsl:value-of select="$name" />
				</fo:block>
				<xsl:call-template name='attribute-block'>
					<xsl:with-param name="text"><xsl:value-of select="$address" /></xsl:with-param>
				</xsl:call-template>
				<xsl:call-template name='attribute-block'>
					<xsl:with-param name="text"><xsl:value-of select="$phone" /></xsl:with-param>
				</xsl:call-template>
				<xsl:call-template name='attribute-block'>
					<xsl:with-param name="text"><xsl:value-of select="$email" /></xsl:with-param>
				</xsl:call-template>
				<xsl:call-template name='attribute-block'>
					<xsl:with-param name="text"><xsl:value-of select="$website" /></xsl:with-param>
				</xsl:call-template>
				<xsl:for-each select="//asmContext[metadata/@semantictag='socialnetwork']/asmResource[@xsi_type='URL']">
					<xsl:call-template name='attribute-block'>
						<xsl:with-param name="text"><xsl:value-of select="url" /></xsl:with-param>
					</xsl:call-template>
				</xsl:for-each>
				<xsl:call-template name='attribute-block'>
					<xsl:with-param name="text">Sexe : <xsl:value-of select="$sex" /></xsl:with-param>
				</xsl:call-template>
				<xsl:call-template name='attribute-block'>
					<xsl:with-param name="text">Nationalité : <xsl:value-of select="$citizenship" /></xsl:with-param>
				</xsl:call-template>
				<xsl:call-template name='attribute-block'>
					<xsl:with-param name="text">Permis de conduire : <xsl:value-of select="$driver_license" /></xsl:with-param>
				</xsl:call-template>
			</fo:table-cell>
		</fo:table-row>
	</xsl:template>
	
	<!-- ========================================== -->
	<xsl:template name="emploi-vise">
	<!-- ========================================== -->
		<fo:table-row>
			<fo:table-cell  padding-top='5pt' padding-right='5pt'>
				<fo:block text-align='right' space-before="6pt" color="#909090"><fo:inline font-size="12pt">P</fo:inline>OSTE, EMPLOI VISÉ</fo:block>
			</fo:table-cell>
			<fo:table-cell padding-top='5pt' padding-left='5pt'>
				<fo:block>
					<xsl:apply-templates select="//asmContext[metadata/@semantictag='researched_job']/asmResource[@xsi_type='TextField']"/>
				</fo:block>
			</fo:table-cell>
		</fo:table-row>
	</xsl:template>

	<!-- ========================================== -->
	<xsl:template name="interets">
	<!-- ========================================== -->
		<fo:table-row>
			<fo:table-cell  padding-top='5pt' padding-right='5pt'>
				<fo:block text-align='right' space-before="6pt" color="#909090"><fo:inline font-size="12pt">I</fo:inline>NTÉRÊTS</fo:block>
			</fo:table-cell>
			<fo:table-cell padding-top='5pt' padding-left='5pt'>
				<fo:block>
					<xsl:apply-templates select="//asmContext[metadata/@semantictag='interest']/asmResource[@xsi_type='TextField']"/>
				</fo:block>
			</fo:table-cell>
		</fo:table-row>
	</xsl:template>
	
	<!-- ========================================== -->
	<xsl:template name="experiences-label">
	<!-- ========================================== -->
		<fo:table-row space-before="10pt">
			<fo:table-cell padding-top='5pt' padding-right='5pt'>
				<fo:block text-align='right' color="#7db00e"><fo:inline font-size="12pt">E</fo:inline>XPÉRIENCES PROFESSIONNELLES</fo:block>
			</fo:table-cell>
			<fo:table-cell padding-top='5pt' padding-right='5pt'>
				<fo:block>	</fo:block>
			</fo:table-cell>
		</fo:table-row>
	</xsl:template>

	<!-- ========================================== -->
	<xsl:template name="experiences">
	<!-- ========================================== -->
		<xsl:for-each select="//asmUnit[contains(metadata/@semantictag,'job-unit')]">
			<fo:table-row>
				<fo:table-cell padding-top='5pt' padding-right='5pt'>
					<fo:block text-align='right'>
						De <xsl:value-of select=".//asmContext[metadata/@semantictag='date-begin']/asmResource[@xsi_type='Field']/text" />
						à <xsl:value-of select=".//asmContext[metadata/@semantictag='date-end']/asmResource[@xsi_type='Field']/text" />
					</fo:block>
				</fo:table-cell>
				<fo:table-cell  padding-top='5pt' padding-left='5pt'>
					<fo:block><xsl:value-of select="./asmResource[@xsi_type='nodeRes']/label[@lang='fr']"/></fo:block>
					<fo:block><xsl:value-of select=".//asmContext[metadata/@semantictag='estb-name']/asmResource[@xsi_type='Field']/text" /></fo:block>
					<fo:block><xsl:apply-templates select=".//asmContext[metadata/@semantictag='job-missions']/asmResource[@xsi_type='TextField']"/></fo:block>
					<fo:block><xsl:apply-templates select=".//asmContext[metadata/@semantictag='job-realizations']/asmResource[@xsi_type='TextField']"/></fo:block>
				</fo:table-cell>
			</fo:table-row>
		</xsl:for-each>
		<xsl:for-each select="//asmUnit[contains(metadata/@semantictag,'internship-unit')]">
			<fo:table-row>
			<fo:table-cell padding-top='5pt' padding-right='5pt'>
					<fo:block text-align='right'>
						<xsl:value-of select=".//asmContext[metadata/@semantictag='date-begin']/asmResource[@xsi_type='Field']/text" />
						- <xsl:value-of select=".//asmContext[metadata/@semantictag='duration']/asmResource[@xsi_type='Field']/text" />
					</fo:block>
				</fo:table-cell>
				<fo:table-cell  padding-top='5pt' padding-left='5pt'>
					<fo:block><xsl:value-of select="./asmResource[@xsi_type='nodeRes']/label[@lang='fr']"></xsl:value-of></fo:block>
					<fo:block><xsl:value-of select=".//asmContext[metadata/@semantictag='estb-name']/asmResource[@xsi_type='Field']/text" /></fo:block>
					<fo:block><xsl:apply-templates select=".//asmContext[metadata/@semantictag='job-missions']/asmResource[@xsi_type='TextField']"/></fo:block>
					<fo:block><xsl:apply-templates select=".//asmContext[metadata/@semantictag='job-realizations']/asmResource[@xsi_type='TextField']"/></fo:block>
				</fo:table-cell>
			</fo:table-row>
		</xsl:for-each>
		<xsl:for-each select="//asmUnit[contains(metadata/@semantictag,'alternance-unit')]">
			<fo:table-row>
				<fo:table-cell padding-top='5pt' padding-right='5pt'>
					<fo:block text-align='right'>
						De <xsl:value-of select=".//asmContext[metadata/@semantictag='date-begin']/asmResource[@xsi_type='Field']/text" />
						à <xsl:value-of select=".//asmContext[metadata/@semantictag='date-end']/asmResource[@xsi_type='Field']/text" />
					</fo:block>
				</fo:table-cell>
				<fo:table-cell  padding-top='5pt' padding-left='5pt'>
					<fo:block><xsl:value-of select="./asmResource[@xsi_type='nodeRes']/label[@lang='fr']"></xsl:value-of></fo:block>
					<fo:block><xsl:value-of select=".//asmContext[metadata/@semantictag='estb-name']/asmResource[@xsi_type='Field']/text[@lang=$lang]" /></fo:block>
					<fo:block><xsl:apply-templates select=".//asmContext[metadata/@semantictag='job-missions']/asmResource[@xsi_type='TextField']"/></fo:block>
					<fo:block><xsl:apply-templates select=".//asmContext[metadata/@semantictag='job-realizations']/asmResource[@xsi_type='TextField']"/></fo:block>
				</fo:table-cell>
			</fo:table-row>
		</xsl:for-each>
		<xsl:for-each select="//asmUnit[contains(metadata/@semantictag,'project-unit')]">
			<fo:table-row>
				<fo:table-cell padding-top='5pt' padding-right='5pt'>
					<fo:block text-align='right'>
						De <xsl:value-of select=".//asmContext[metadata/@semantictag='date-begin']/asmResource[@xsi_type='Field']/text" />
						à <xsl:value-of select=".//asmContext[metadata/@semantictag='date-end']/asmResource[@xsi_type='Field']/text" />
					</fo:block>
				</fo:table-cell>
				<fo:table-cell  padding-top='5pt' padding-left='5pt'>
					<fo:block><xsl:value-of select="./asmResource[@xsi_type='nodeRes']/label[@lang='fr']"></xsl:value-of></fo:block>
					<fo:block><xsl:value-of select=".//asmContext[metadata/@semantictag='estb-name']/asmResource[@xsi_type='Field']/text[@lang=$lang]" /></fo:block>
					<fo:block><xsl:apply-templates select=".//asmContext[metadata/@semantictag='job-missions']/asmResource[@xsi_type='TextField']"/></fo:block>
					<fo:block><xsl:apply-templates select=".//asmContext[metadata/@semantictag='job-realizations']/asmResource[@xsi_type='TextField']"/></fo:block>
				</fo:table-cell>
			</fo:table-row>
		</xsl:for-each>
	</xsl:template>
	
	<!-- ========================================== -->
	<xsl:template name="experiences-perso-label">
	<!-- ========================================== -->
		<fo:table-row space-before="10pt">
			<fo:table-cell padding-top='5pt' padding-right='5pt'>
				<fo:block text-align='right' color="#873283"><fo:inline font-size="12pt">E</fo:inline>XPÉRIENCES PERSONNELLES</fo:block>
			</fo:table-cell>
			<fo:table-cell padding-top='5pt' padding-right='5pt'>
				<fo:block>	</fo:block>
			</fo:table-cell>
		</fo:table-row>
	</xsl:template>

	<!-- ========================================== -->
	<xsl:template name="experiences-perso">
	<!-- ========================================== -->
		<xsl:for-each select="//asmUnit[contains(metadata/@semantictag,'experience_perso-unit')]">
			<fo:table-row>
				<fo:table-cell padding-top='5pt' padding-right='5pt'>
					<fo:block text-align='right'>
						<!--De <xsl:value-of select=".//asmContext[metadata/@semantictag='date-begin']/asmResource[@xsi_type='Field']/text" />
						à <xsl:value-of select=".//asmContext[metadata/@semantictag='date-end']/asmResource[@xsi_type='Field']/text" /-->
					</fo:block>
				</fo:table-cell>
				<fo:table-cell  padding-top='5pt' padding-left='5pt'>
					<fo:block><xsl:value-of select="./asmResource[@xsi_type='nodeRes']/label[@lang='fr']"/></fo:block>
					<fo:block><xsl:apply-templates select=".//asmContext[metadata/@semantictag='contexte-activite']/asmResource[@xsi_type='TextField']"/></fo:block>
					<fo:block><xsl:apply-templates select=".//asmContext[metadata/@semantictag='realizations']/asmResource[@xsi_type='TextField']"/></fo:block>
				</fo:table-cell>
			</fo:table-row>
		</xsl:for-each>
	</xsl:template>

	<!-- ========================================== -->
	<xsl:template name="education-label">
	<!-- ========================================== -->
		<fo:table-row space-before="10pt">
				<fo:table-cell padding-top='5pt' padding-right='5pt'>
				<fo:block text-align='right' color="#ed6e28"><fo:inline font-size="12pt">É</fo:inline>DUCATION ET <fo:inline font-size="12pt">F</fo:inline>ORMATION</fo:block>
			</fo:table-cell>
			<fo:table-cell >
				<fo:block>	</fo:block>
			</fo:table-cell>
		</fo:table-row>
	</xsl:template>

	<!-- ========================================== -->
	<xsl:template name="educations">
	<!-- ========================================== -->
		<xsl:for-each select="//asmUnit[contains(metadata/@semantictag,'diploma-unit')]">
			<fo:table-row>
				<fo:table-cell padding-top='5pt' padding-right='5pt'>
					<fo:block text-align='right'>
						De <xsl:value-of select=".//asmContext[metadata/@semantictag='diploma-begin']/asmResource[@xsi_type='Field']/text" />
						à <xsl:value-of select=".//asmContext[metadata/@semantictag='diploma-end']/asmResource[@xsi_type='Field']/text" />
					</fo:block>
				</fo:table-cell>
				<fo:table-cell padding-top='5pt' padding-right='5pt'>
					<fo:block>
						<xsl:value-of select="./asmResource[@xsi_type='nodeRes']/label[@lang='fr']"/>
						<xsl:variable name="specialisation"><xsl:value-of select=".//asmContext[metadata/@semantictag='specialization-label']/asmResource[@xsi_type='Field']/text" /></xsl:variable>
						<xsl:if test="not($specialisation='')">
							<xsl:text> - </xsl:text><xsl:value-of select="$specialisation"></xsl:value-of>
						</xsl:if>
						
					</fo:block>
					<fo:block><xsl:value-of select=".//asmContext[metadata/@semantictag='name']/asmResource[@xsi_type='Field']/text" /></fo:block>
				</fo:table-cell>
			</fo:table-row>
		</xsl:for-each>
		<xsl:for-each select="//asmUnit[contains(metadata/@semantictag,'formation-unit')]">
			<fo:table-row>
				<fo:table-cell padding-top='5pt' padding-right='5pt'>
					<fo:block text-align='right'>
						De <xsl:value-of select=".//asmContext[metadata/@semantictag='formation-begin']/asmResource[@xsi_type='Field']/text" />
						à <xsl:value-of select=".//asmContext[metadata/@semantictag='formation-end']/asmResource[@xsi_type='Field']/text" />
					</fo:block>
				</fo:table-cell>
				<fo:table-cell padding-top='5pt' padding-left='5pt'>
					<fo:block><xsl:value-of select="./asmResource[@xsi_type='nodeRes']/label[@lang='fr']"></xsl:value-of></fo:block>
					<fo:block><xsl:value-of select=".//asmContext[metadata/@semantictag='name']/asmResource[@xsi_type='Field']/text" /></fo:block>
				</fo:table-cell>
			</fo:table-row>
		</xsl:for-each>
	</xsl:template>

	<!-- ========================================== -->
	<xsl:template name="competences-label">
	<!-- ========================================== -->
		<fo:table-row space-before="10pt">
				<fo:table-cell padding-top='5pt' padding-right='5pt'>
				<fo:block text-align='right' color="#909090"><fo:inline font-size="12pt">C</fo:inline>OMPÉTENCES</fo:block>
			</fo:table-cell>
			<fo:table-cell >
				<fo:block>	</fo:block>
			</fo:table-cell>
		</fo:table-row>
	</xsl:template>
	
	<!-- ========================================== -->
	<xsl:template name="mother-tongue">
	<!-- ========================================== -->
			<fo:table-row>
				<fo:table-cell padding-top='5pt' padding-right='5pt'>
					<fo:block text-align='right'>Langue Maternelle</fo:block>
				</fo:table-cell>
				<fo:table-cell padding-top='5pt' padding-right='5pt'>
					<fo:block><xsl:value-of select="//asmContext[metadata/@semantictag='MotherTongue']/asmResource[@xsi_type='Get_Resource']/label[@lang='fr']" /></fo:block>
				</fo:table-cell>
			</fo:table-row>
	</xsl:template>

	<!-- ========================================== -->
	<xsl:template name="other-tongue">
	<!-- ========================================== -->
			<fo:table-row>
				<fo:table-cell padding-top='5pt' padding-right='5pt'>
					<fo:block text-align='right'>Langue(s) Étrangère(s)</fo:block>
				</fo:table-cell>
				<fo:table-cell padding-top='5pt' padding-right='5pt'>
					<!-- ===================== -->
					<fo:table width="80%">
						<fo:table-column column-width="20%"/>
						<fo:table-column column-width="20%"/>
						<fo:table-column column-width="20%"/>
						<fo:table-column column-width="20%"/>
						<fo:table-column column-width="20%"/>
						<fo:table-column column-width="20%"/>
						<fo:table-body>
							<fo:table-row>
								<fo:table-cell>
									<fo:block> </fo:block>
								</fo:table-cell>
								<fo:table-cell border="1px solid lightgrey" number-columns-spanned="2">
									<fo:block font-size="9pt" text-align="center" margin-top='4px' >
										COMPRENDRE
									</fo:block>
								</fo:table-cell>
								<fo:table-cell border="1px solid lightgrey" number-columns-spanned="2">
									<fo:block  font-size="9pt" text-align="center" margin-top='4px' >
										PARLER
									</fo:block>
								</fo:table-cell>
								<fo:table-cell border="1px solid lightgrey">
									<fo:block  font-size="9pt" text-align="center" margin-top='4px' >
										ÉCRIRE
									</fo:block>
								</fo:table-cell>
							</fo:table-row>
							<xsl:for-each select="//asmUnitStructure[metadata/@semantictag='europass_language']">
								<xsl:call-template name="langue"/>
							</xsl:for-each>
						</fo:table-body>
					</fo:table>
					<!-- ===================== -->
				</fo:table-cell>
			</fo:table-row>
	</xsl:template>

	<!-- ========================================== -->
	<xsl:template name="langue">
	<!-- ========================================== -->
		<fo:table-row>
			<fo:table-cell>
				<fo:block  font-size="9pt" margin-top='4px'>
					<fo:block><xsl:value-of select=".//asmContext[metadata/@semantictag='ForeignLanguage']/asmResource[@xsi_type='Get_Resource']/label[@lang='fr']" /></fo:block>
				</fo:block>
			</fo:table-cell>
			<fo:table-cell border="1px solid lightgrey">
				<fo:block  font-size="9pt" text-align="center" margin-top='4px'>
					<fo:block><xsl:value-of select=".//asmContext[metadata/@semantictag='Listening']/asmResource[@xsi_type='Get_Get_Resource']/value" /></fo:block>
				</fo:block>
			</fo:table-cell>
			<fo:table-cell border="1px solid lightgrey">
				<fo:block  font-size="9pt" text-align="center" margin-top='4px'>
					<fo:block><xsl:value-of select=".//asmContext[metadata/@semantictag='Reading']/asmResource[@xsi_type='Get_Get_Resource']/value" /></fo:block>
				</fo:block>
			</fo:table-cell>
			<fo:table-cell border="1px solid lightgrey">
				<fo:block  font-size="9pt" text-align="center" margin-top='4px'>
					<fo:block><xsl:value-of select=".//asmContext[metadata/@semantictag='SpokenInteraction']/asmResource[@xsi_type='Get_Get_Resource']/value" /></fo:block>
				</fo:block>
			</fo:table-cell>
			<fo:table-cell border="1px solid lightgrey">
				<fo:block  font-size="9pt" text-align="center" margin-top='4px'>
					<fo:block><xsl:value-of select=".//asmContext[metadata/@semantictag='SpokenProduction']/asmResource[@xsi_type='Get_Get_Resource']/value" /></fo:block>
				</fo:block>
			</fo:table-cell>
			<fo:table-cell border="1px solid lightgrey">
				<fo:block  font-size="9pt" text-align="center" margin-top='4px'>
					<fo:block><xsl:value-of select=".//asmContext[metadata/@semantictag='Writing']/asmResource[@xsi_type='Get_Get_Resource']/value" /></fo:block>
				</fo:block>
			</fo:table-cell>
		</fo:table-row>
	</xsl:template>
	
	<!-- ========================================== -->
	<xsl:template match="domaine">
	<!-- ========================================== -->
		<fo:block font-size='11pt'>
			<xsl:value-of select="."/>
		</fo:block>
	</xsl:template>

	<!-- ========================================== -->
	<xsl:template match="activite">
	<!-- ========================================== -->
		<fo:block margin-left="5pt" font-size='10pt'>
			<xsl:value-of select="."/>
		</fo:block>
	</xsl:template>
	
	<!-- ========================================== -->
	<xsl:template match="competence">
	<!-- ========================================== -->
		<fo:block margin-left="15pt" font-size="9pt">
			<fo:inline font-family="Symbol" font-size="10pt">&#8226; </fo:inline><xsl:value-of select="."/>
		</fo:block>
	</xsl:template>

	<!-- ========================================== -->
	<xsl:template match="competence-free">
	<!-- ========================================== -->
		<xsl:choose>
			<xsl:when test="preceding-sibling::*[ 1][self::domaine]">
				<fo:block margin-left="15pt" font-size="9pt">
					<fo:inline font-family="Symbol" font-size="10pt">&#8226; </fo:inline><xsl:value-of select="."/>
				</fo:block>
			</xsl:when>
			<xsl:otherwise>
				<fo:block margin-left="15pt" margin-top="0pt" font-size="9pt"><!-- 8/12/2016 mis à 0 -->
					<fo:inline font-family="Symbol" font-size="10pt">&#8226; </fo:inline><xsl:value-of select="."/>
				</fo:block>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>

	<!-- ========================================== -->
	<xsl:template name="competences-metiers">
	<!-- ========================================== -->
		<fo:table-row>
			<fo:table-cell padding-top='5pt' padding-right='5pt'>
				<fo:block text-align='right'>Compétences métiers</fo:block>
			</fo:table-cell>
			<fo:table-cell padding-top='5pt' padding-right='5pt'>
				<fo:block></fo:block>
				<xsl:apply-templates select="//asmContext[metadata/@semantictag='competence-cv-metier']//competences-metiers/*"/>
			</fo:table-cell>
		</fo:table-row>
	</xsl:template>

	<!-- ========================================== -->
	<xsl:template name="competences-transversales">
	<!-- ========================================== -->
		<fo:table-row>
			<fo:table-cell padding-top='5pt' padding-right='5pt'>
				<fo:block text-align='right'>Compétences transversales</fo:block>
			</fo:table-cell>
			<fo:table-cell padding-top='5pt' padding-right='5pt'>
				<fo:block></fo:block>
				<xsl:apply-templates select="//asmContext[metadata/@semantictag='competence-cv-trans']//competences-trans/*"/>
			</fo:table-cell>
		</fo:table-row>
	</xsl:template>

	<!-- ========================================== -->
	<xsl:template name="competences-autres">
	<!-- ========================================== -->
		<fo:table-row>
			<fo:table-cell padding-top='5pt' padding-right='5pt'>
				<fo:block text-align='right'>Autres compétences</fo:block>
			</fo:table-cell>
			<fo:table-cell padding-top='5pt' padding-right='5pt'>
				<fo:block></fo:block>
				<xsl:apply-templates select="//asmContext[metadata/@semantictag='competence-cv-autres']//competences-autres/*"/>
			</fo:table-cell>
		</fo:table-row>
	</xsl:template>
	
	<!-- ========================================== -->
	<xsl:template name="competences-metiers-old">
	<!-- ========================================== -->
		<fo:table-row>
			<fo:table-cell padding-top='5pt' padding-right='5pt'>
				<fo:block text-align='right'>Compétences métiers</fo:block>
			</fo:table-cell>
			<fo:table-cell padding-top='5pt' padding-right='5pt'>
				<fo:block></fo:block>
				<xsl:for-each select="//asmContext[(metadata/@semantictag='domaine-metier' or metadata/@semantictag='dom-metier-ref') and not(preceding::asmContext[(metadata/@semantictag='domaine-metier' or metadata/@semantictag='dom-metier-ref')]/asmResource[@xsi_type='Get_Resource']/value=asmResource[@xsi_type='Get_Resource']/value)]">
					<xsl:sort select="asmResource[@xsi_type='Get_Resource']/value"/>
					<xsl:variable name="value"><xsl:value-of select="asmResource[@xsi_type='Get_Resource']/value"/></xsl:variable>
					<xsl:variable name="nbOK"><xsl:value-of select="count(../..//asmContext[metadata/@semantictag='eval-etudiant']/asmResource[@xsi_type='Get_Resource' and (value='A4' or value='A3' or value='A2')])"/></xsl:variable>
					<xsl:variable name="nbComp"><xsl:value-of select="count(..//asmContext[metadata/@semantictag='competence-metier'])"/></xsl:variable>
					<xsl:if test="not($value='') and $nbOK&gt;0">
						<fo:block font-size='11pt'>
							<xsl:value-of select="asmResource[@xsi_type='Get_Resource']/label[@lang='fr']"/>
						</fo:block>
						<xsl:for-each select="//asmUnit[asmUnitStructure/asmContext[(metadata/@semantictag='domaine-metier' or metadata/@semantictag='dom-metier-ref' or metadata/@semantictag='domaine-comps')] and asmUnitStructure/asmContext/asmResource[@xsi_type='Get_Resource']/value=$value] | //asmUnit[asmUnitStructure/asmUnitStructure/asmContext[(metadata/@semantictag='domaine-metier' or metadata/@semantictag='dom-metier-ref' or metadata/@semantictag='domaine-comps')] and asmUnitStructure/asmUnitStructure/asmContext/asmResource[@xsi_type='Get_Resource']/value=$value] | //asmUnit[asmContext[(metadata/@semantictag='domaine-metier' or metadata/@semantictag='dom-metier-ref' or metadata/@semantictag='domaine-comps')] and asmContext/asmResource[@xsi_type='Get_Resource']/value=$value] ">
							<xsl:choose>
								<xsl:when test="(asmUnitStructure/asmContext/asmResource[@xsi_type='Get_Resource']/value=$value) or (asmContext/asmResource[@xsi_type='Get_Resource']/value=$value)">
									<xsl:for-each select=".//asmUnitStructure[contains(asmContext/metadata/@semantictag,'activite') and .//asmContext[contains(metadata/@semantictag,'competence-metier')] and not(preceding::asmContext[contains(metadata/@semantictag,'activite')]/asmResource[@xsi_type='Get_Get_Resource']/value=asmContext[contains(metadata/@semantictag,'activite')]/asmResource[@xsi_type='Get_Get_Resource']/value)]">
										<xsl:sort select="asmContext[contains(metadata/@semantictag,'activite')]/asmResource[@xsi_type='Get_Get_Resource']/value"/>
										<xsl:variable name="nbOK1"><xsl:value-of select="count(.//asmContext[metadata/@semantictag='eval-etudiant']/asmResource[@xsi_type='Get_Resource' and (value='A4' or value='A3' or value='A2')])"/></xsl:variable>
										<xsl:if test="$nbOK1&gt;0">
											<fo:block>
												<xsl:value-of select="asmContext[contains(metadata/@semantictag,'activite')]/asmResource[@xsi_type='Get_Get_Resource']/label[@lang='fr']"></xsl:value-of>
											</fo:block>
											<xsl:for-each select=".//asmContext[contains(metadata/@semantictag,'competence-metier') and not(preceding::asmContext[contains(metadata/@semantictag,'competence-metier')]/asmResource[@xsi_type='Get_Get_Resource']/value=asmResource[@xsi_type='Get_Get_Resource']/value)]">
												<xsl:sort select="asmResource[@xsi_type='Get_Get_Resource']/value"/>
												<xsl:if test="not(../asmContext[metadata/@semantictag='eval-etudiant']/asmResource[@xsi_type='Get_Resource']/value='') and contains('A4 A3 A2',../asmContext[metadata/@semantictag='eval-etudiant']/asmResource[@xsi_type='Get_Resource']/value)">
													<fo:block margin-left="15pt">
														<fo:inline font-family="Symbol" font-size="10pt">&#8226; </fo:inline><xsl:value-of select="asmResource[@xsi_type='Get_Get_Resource']/label[@lang='fr']"/>
													</fo:block>
												</xsl:if>
											</xsl:for-each>
										</xsl:if>
									</xsl:for-each>
								</xsl:when>
								<xsl:otherwise>
									<xsl:for-each select=".//asmContext[contains(metadata/@semantictag,'free-comp-metier') and not(preceding::asmContext[contains(metadata/@semantictag,'free-comp-metier')]/asmResource[@xsi_type='Field']/text[@lang='fr']=asmResource[@xsi_type='Field']/text[@lang='fr'])]">
										<xsl:sort select="asmResource[@xsi_type='Get_Get_Resource']/value"/>
										<xsl:if test="not(../asmContext[metadata/@semantictag='eval-etudiant']/asmResource[@xsi_type='Get_Resource']/value='') and contains('A4 A3 A2',../asmContext[metadata/@semantictag='eval-etudiant']/asmResource[@xsi_type='Get_Resource']/value)">
											<fo:block margin-left="15pt">
												<fo:inline font-family="Symbol" font-size="10pt">&#8226; </fo:inline><xsl:value-of select="asmResource[@xsi_type='Field']/text[@lang='fr']"></xsl:value-of>
											</fo:block>
										</xsl:if>
									</xsl:for-each>
								</xsl:otherwise>
							</xsl:choose>
						</xsl:for-each>
					</xsl:if>
				</xsl:for-each>
			</fo:table-cell>
		</fo:table-row>
	</xsl:template>

	<!-- ========================================== -->
	<xsl:template name="competences-transversales-old">
	<!-- ========================================== -->
		<fo:table-row>
			<fo:table-cell padding-top='5pt' padding-right='5pt'>
				<fo:block text-align='right'>Compétences transversales</fo:block>
			</fo:table-cell>
			<fo:table-cell padding-top='5pt' padding-right='5pt'>
				<fo:block></fo:block>
				<xsl:for-each select="//asmContext[(metadata/@semantictag='activite') and not(preceding::asmContext[(metadata/@semantictag='activite')]/asmResource[@xsi_type='Get_Get_Resource']/value=asmResource[@xsi_type='Get_Get_Resource']/value)]">
					<xsl:sort select="asmResource[@xsi_type='Get_Get_Resource']/value"/>
					<xsl:variable name="value"><xsl:value-of select="asmResource[@xsi_type='Get_Get_Resource']/value"/></xsl:variable>
					<xsl:variable name="nbOK"><xsl:value-of select="count(..//asmContext[metadata/@semantictag='eval-etudiant']/asmResource[@xsi_type='Get_Resource' and (value='A4' or value='A3' or value='A2')])"/></xsl:variable>
					<xsl:variable name="nbComp"><xsl:value-of select="count(..//asmContext[metadata/@semantictag='competence-trans'])"/></xsl:variable>
					<xsl:if test="not($value='') and $nbOK&gt;0 and $nbComp&gt;0">
							<xsl:for-each select="//asmUnit[asmUnitStructure/asmUnitStructure/asmUnitStructure/asmContext[(metadata/@semantictag='activite')] and asmUnitStructure/asmUnitStructure/asmUnitStructure/asmContext/asmResource[@xsi_type='Get_Get_Resource']/value=$value] | //asmUnit[asmUnitStructure/asmUnitStructure/asmContext[(metadata/@semantictag='activite')] and asmUnitStructure/asmUnitStructure/asmContext/asmResource[@xsi_type='Get_Get_Resource']/value=$value] | //asmUnit[asmContext[(metadata/@semantictag='activite')] and asmContext/asmResource[@xsi_type='Get_Get_Resource']/value=$value] ">
							<xsl:choose>
								<xsl:when test="//asmUnitStructure/asmContext/asmResource[@xsi_type='Get_Get_Resource']/value=$value">
									<xsl:for-each select=".//asmUnitStructure[contains(asmContext/metadata/@semantictag,'activite') and not(preceding::asmContext[contains(metadata/@semantictag,'activite')]/asmResource[@xsi_type='Get_Get_Resource']/value=asmContext[contains(metadata/@semantictag,'activite')]/asmResource[@xsi_type='Get_Get_Resource']/value)]">
										<xsl:sort select="asmContext[contains(metadata/@semantictag,'activite')]/asmResource[@xsi_type='Get_Get_Resource']/value"/>
										<xsl:variable name="nbOK1"><xsl:value-of select="count(.//asmContext[metadata/@semantictag='eval-etudiant']/asmResource[@xsi_type='Get_Resource' and (value='A4' or value='A3' or value='A2')])"/></xsl:variable>
										<xsl:if test="$nbOK1&gt;0">
											<fo:block>
												<xsl:value-of select="asmContext[contains(metadata/@semantictag,'activite')]/asmResource[@xsi_type='Get_Get_Resource']/label[@lang='fr']"></xsl:value-of>
											</fo:block>
											<xsl:for-each select=".//asmContext[contains(metadata/@semantictag,'competence-trans') and not(preceding::asmContext[contains(metadata/@semantictag,'competence-trans')]/asmResource[@xsi_type='Get_Get_Resource']/value=asmResource[@xsi_type='Get_Get_Resource']/value)]">
												<xsl:sort select="asmResource[@xsi_type='Get_Get_Resource']/value"/>
												<xsl:if test="not(../asmContext[metadata/@semantictag='eval-etudiant']/asmResource[@xsi_type='Get_Resource']/value='') and contains('A4 A3 A2',../asmContext[metadata/@semantictag='eval-etudiant']/asmResource[@xsi_type='Get_Resource']/value)">
													<fo:block margin-left="15pt">
														<fo:inline font-family="Symbol" font-size="10pt">&#8226; </fo:inline><xsl:value-of select="asmResource[@xsi_type='Get_Get_Resource']/label[@lang='fr']"/>
													</fo:block>
												</xsl:if>
											</xsl:for-each>
										</xsl:if>
									</xsl:for-each>
								</xsl:when>
								<xsl:otherwise>
									<xsl:for-each select=".//asmContext[contains(metadata/@semantictag,'free-comp-metier') and not(preceding::asmContext[contains(metadata/@semantictag,'free-comp-metier')]/asmResource[@xsi_type='Field']/text[@lang='fr']=asmResource[@xsi_type='Field']/text[@lang='fr'])]">
										<xsl:sort select="asmResource[@xsi_type='Get_Get_Resource']/value"/>
										<xsl:if test="not(../asmContext[metadata/@semantictag='eval-etudiant']/asmResource[@xsi_type='Get_Resource']/value='') and contains('A4 A3 A2',../asmContext[metadata/@semantictag='eval-etudiant']/asmResource[@xsi_type='Get_Resource']/value)">
											<fo:block margin-left="15pt">
												<fo:inline font-family="Symbol" font-size="10pt">&#8226; </fo:inline><xsl:value-of select="asmResource[@xsi_type='Field']/text[@lang='fr']"></xsl:value-of>
											</fo:block>
										</xsl:if>
									</xsl:for-each>
								</xsl:otherwise>
							</xsl:choose>
						</xsl:for-each>
					</xsl:if>
				</xsl:for-each>
			</fo:table-cell>
		</fo:table-row>
	</xsl:template>
	
	<!-- ========================================== -->
	<xsl:template name="competences-autres-old">
	<!-- ========================================== -->
			<fo:table-row>
				<fo:table-cell padding-top='5pt' padding-right='5pt'>
					<fo:block text-align='right'>Autres compétences</fo:block>
				</fo:table-cell>
				<fo:table-cell padding-top='5pt' padding-right='5pt'>
					<fo:block></fo:block>
					<xsl:for-each select="//asmContext[metadata/@semantictag='dom-autre-ref' and not(preceding::asmContext[metadata/@semantictag='dom-autre-ref']/asmResource[@xsi_type='Get_Resource']/value=asmResource[@xsi_type='Get_Resource']/value)]">
						<xsl:sort select="asmResource[@xsi_type='Get_Resource']/value"/>
						<xsl:variable name="value"><xsl:value-of select="asmResource[@xsi_type='Get_Resource']/value"/></xsl:variable>
						<xsl:variable name="nbOK1"><xsl:value-of select="count(../..//asmContext[metadata/@semantictag='eval-etudiant']/asmResource[@xsi_type='Get_Resource' and (value='A4' or value='A3' or value='A2')])"/></xsl:variable>
						<xsl:if test="not($value='') and $nbOK1&gt;0">
							<fo:block font-size='11pt'>
								<xsl:value-of select="asmResource[@xsi_type='Get_Resource']/label[@lang='fr']"/>
							</fo:block>
							<xsl:for-each select="//asmUnitStructure[asmContext[metadata/@semantictag='dom-autre-ref'] and asmContext/asmResource[@xsi_type='Get_Resource']/value=$value]">
								<xsl:for-each select=".//asmContext[contains(metadata/@semantictag,'free-comp-autre') and not(preceding::asmContext[contains(metadata/@semantictag,'free-comp-autre')]/asmResource[@xsi_type='Field']/text[@lang='fr']=asmResource[@xsi_type='Field']/text[@lang='fr'])]">
									<xsl:sort select="asmResource[@xsi_type='Get_Resource']/value"/>
									<xsl:if test="not(../asmContext[metadata/@semantictag='eval-etudiant']/asmResource[@xsi_type='Get_Resource']/value='') and contains('A4 A3 A2',../asmContext[metadata/@semantictag='eval-etudiant']/asmResource[@xsi_type='Get_Resource']/value)">
										<fo:block margin-left="15pt">
											<fo:inline font-family="Symbol" font-size="10pt">&#8226; </fo:inline><xsl:value-of select="asmResource[@xsi_type='Field']/text[@lang='fr']"></xsl:value-of>
										</fo:block>
									</xsl:if>
								</xsl:for-each>
							</xsl:for-each>
						</xsl:if>
					</xsl:for-each>
				</fo:table-cell>
			</fo:table-row>
	</xsl:template>

	<!-- ========================================== -->
	<xsl:template name="attribute-block">
	<!-- ========================================== -->
		<xsl:param name="text"></xsl:param>
		<fo:block  space-before="1pt">
			<xsl:value-of select="$text" />
		</fo:block>
	</xsl:template>
</xsl:stylesheet>

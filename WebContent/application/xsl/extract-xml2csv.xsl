<?xml version="1.0"  encoding="UTF-8" ?>
<!DOCTYPE xsl:stylesheet [
<!ENTITY nbsp "&amp;#160;">
]>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:fo="http://www.w3.org/1999/XSL/Format" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	version="1.0">
	<xsl:output method="text"/>
	
	<xsl:template match="/">
		<xsl:apply-templates select="//line"/>
	</xsl:template>
	
	<xsl:template match='line'><xsl:apply-templates select="*"/><xsl:text>&#10;</xsl:text></xsl:template>

	<xsl:template match='uuid'><xsl:value-of select='.'/>;</xsl:template>

	<xsl:template match='Profile-inter'><xsl:apply-templates select="*"/></xsl:template>
	<xsl:template match='profil-inter-question'><xsl:value-of select='value'/>;</xsl:template>
	<xsl:template match='periode-sejours-etranger'><xsl:value-of select='.'/>;</xsl:template>
	<xsl:template match='total-sejours-etranger'><xsl:value-of select='.'/>;</xsl:template>

	<xsl:template match='TestPerso'><xsl:apply-templates select="*"/></xsl:template>
	<xsl:template match='trait'><xsl:value-of select='value'/>;</xsl:template>

	<xsl:template match='Langues'><xsl:apply-templates select="*"/></xsl:template>
	<xsl:template match='langue-maternelle'><xsl:value-of select='.'/>;</xsl:template>
	<xsl:template match='langue'><xsl:apply-templates select='*'/></xsl:template>
	<xsl:template match='Listening'><xsl:value-of select='.'/>;</xsl:template>
	<xsl:template match='code'><xsl:value-of select='.'/>;</xsl:template>
	<xsl:template match='Reading'><xsl:value-of select='.'/>;</xsl:template>
	<xsl:template match='SpokenInteraction'><xsl:value-of select='.'/>;</xsl:template>
	<xsl:template match='SpokenProduction'><xsl:value-of select='.'/>;</xsl:template>
	<xsl:template match='Writing'><xsl:value-of select='.'/>;</xsl:template>
	
	<xsl:template match='Experience'>#experience;<xsl:apply-templates select="*"/></xsl:template>
	<xsl:template match='Stage'>#stage;<xsl:apply-templates select="*"/></xsl:template>
	<xsl:template match='taille'><xsl:value-of select='.'/>;</xsl:template>
	<xsl:template match='service'><xsl:value-of select='.'/>;</xsl:template>
	<xsl:template match='url'><xsl:value-of select='.'/>;</xsl:template>
	<xsl:template match='secteur'><xsl:value-of select='.'/>;</xsl:template>
	<xsl:template match='nationalite-entreprise'><xsl:value-of select='.'/>;</xsl:template>
	<xsl:template match='stage-lieu'><xsl:value-of select='.'/>;</xsl:template>
	<xsl:template match='ville'><xsl:value-of select='.'/>;</xsl:template>
	<xsl:template match='code-postal'><xsl:value-of select='.'/>;</xsl:template>
	<xsl:template match='pays'><xsl:value-of select='.'/>;</xsl:template>
	<xsl:template match='job-realizations'><xsl:value-of select='.'/>;</xsl:template>
	<xsl:template match='job-missions'><xsl:value-of select='.'/>;</xsl:template>
	<xsl:template match='apport'><xsl:value-of select='.'/>;</xsl:template>
	<xsl:template match='competence-trans'><xsl:apply-templates select="*"/></xsl:template>
	<xsl:template match='competence-code'><xsl:value-of select='.'/>;</xsl:template>
	<xsl:template match='autoeval'><xsl:value-of select='.'/>;</xsl:template>
	<xsl:template match='progres_eval'><xsl:value-of select='.'/>;</xsl:template>

	
	
</xsl:stylesheet>